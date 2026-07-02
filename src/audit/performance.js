/**
 * Performance Audit Module
 * Lighthouse-based performance auditing for Next.js 16+ portfolio
 * 
 * Run: npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json
 * Or programmatically: node src/audit/performance.js
 */

const lighthouse = require('lighthouse');
const { parseConfig } = require('lighthouse/lighthouse-core/config/constants');
const { getCategories } = require('lighthouse/lighthouse-core/lib/page-functions');
const fs = require('fs');
const path = require('path');

// Performance thresholds for optimal scores (Lighthouse 10+)
const PERFORMANCE_THRESHOLDS = {
  lcp: { excellent: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  inp: { excellent: 200, needsImprovement: 600 },     // Interaction to Next Paint
  cls: { excellent: 0.1, needsImprovement: 0.25 },    // Cumulative Layout Shift
  ttfb: { excellent: 800, needsImprovement: 1800 },   // Time to First Byte
  fcp: { excellent: 1800, needsImprovement: 3000 },   // First Contentful Paint
  si: { excellent: 3500, needsImprovement: 7300 },    // Speed Index
  tti: { excellent: 3800, needsImprovement: 7300 },   // Total Interactive Time
};

// Portfolio-specific optimization checks
const PORTFOLIO_CHECKS = {
  heroSection: {
    name: 'Hero Section Performance',
    checks: [
      { id: 'hero-lcp', description: 'Hero LCP under 2.5s' },
      { id: 'hero-no-layout-shift', description: 'No layout shift in hero' },
      { id: 'hero-preload-fonts', description: 'Custom fonts preloaded' },
    ],
  },
  aboutSection: {
    name: 'About Me Section Performance',
    checks: [
      { id: 'about-text-content', description: 'Text content above fold' },
      { id: 'about-image-optimization', description: 'Images optimized with next/image' },
    ],
  },
  projectsGallery: {
    name: 'Projects Gallery Performance',
    checks: [
      { id: 'gallery-lazy-loading', description: 'Lazy loading for project cards' },
      { id: 'gallery-image-sizes', description: 'Proper image sizes defined' },
      { id: 'gallery-no-excessive-dom', description: 'DOM size under 1500 elements' },
    ],
  },
  contactForm: {
    name: 'Contact Form Performance',
    checks: [
      { id: 'form-minimal-js', description: 'Minimal JavaScript for form' },
      { id: 'form-accessibility', description: 'Form accessible and keyboard navigable' },
    ],
  },
};

/**
 * Run Lighthouse audit against the specified URL
 */
async function runLighthouseAudit(url = 'http://localhost:3000', options = {}) {
  const defaultFlags = {
    port: new URL(url).port || 3000,
    hostname: new URL(url).hostname || 'localhost',
    output: 'json',
    logLevel: 'info',
    onlyCategories: ['performance'],
    formFactor: 'desktop',
    throttlingMethod: 'simulate',
    budget: true,
  };

  const flags = { ...defaultFlags, ...options };

  try {
    const runnerResult = await lighthouse(url, flags);
    const report = runnerResult.report;
    const auditResults = runnerResult.lhr.audits;
    const categories = runnerResult.lhr.categories;

    return {
      success: true,
      score: categories.performance.score,
      audits: auditResults,
      categories,
      url,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Lighthouse audit failed:', error.message);
    return {
      success: false,
      error: error.message,
      url,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Analyze Lighthouse results and generate optimization report
 */
function analyzeResults(auditResults) {
  const analysis = {
    overallScore: 0,
    criticalIssues: [],
    warnings: [],
    optimizations: [],
    categoryScores: {},
    metricDetails: {},
  };

  // Extract performance metrics
  const performanceMetrics = [
    'largest-contentful-paint',
    'interactive',
    'total-blocking-time',
    'cumulative-layout-shift',
    'speed-index',
    'first-contentful-paint',
    'max-potential-fid',
    'server-response-time',
  ];

  performanceMetrics.forEach((metric) => {
    if (auditResults[metric]) {
      const audit = auditResults[metric];
      analysis.metricDetails[metric] = {
        score: audit.score,
        displayValue: audit.displayValue,
        numericValue: audit.numericValue,
        details: audit.details,
      };

      // Check against thresholds
      const threshold = PERFORMANCE_THRESHOLDS[metric];
      if (threshold) {
        if (audit.score < 0.5) {
          analysis.criticalIssues.push({
            metric,
            value: audit.displayValue,
            threshold: `${threshold.excellent}ms`,
            severity: 'critical',
            recommendation: getRecommendation(metric),
          });
        } else if (audit.score < 0.9) {
          analysis.warnings.push({
            metric,
            value: audit.displayValue,
            threshold: `${threshold.excellent}ms`,
            severity: 'warning',
            recommendation: getRecommendation(metric),
          });
        }
      }
    }
  });

  // Check for common portfolio issues
  checkPortfolioSpecificIssues(auditResults, analysis);

  return analysis;
}

/**
 * Get optimization recommendations based on metric
 */
function getRecommendation(metric) {
  const recommendations = {
    'largest-contentful-paint': [
      'Optimize hero section images with next/image and proper sizing',
      'Preload critical fonts using <link rel="preload">',
      'Remove render-blocking JavaScript in the Hero component',
      'Use Next.js Image Optimization for all portfolio images',
      'Consider using WebP/AVIF formats for hero background',
    ],
    'interactive': [
      'Reduce JavaScript bundle size for interactive components',
      'Implement code splitting for Projects gallery',
      'Defer non-critical JavaScript in Contact form',
      'Use React.memo for expensive re-renders in About section',
    ],
    'total-blocking-time': [
      'Break up long tasks using requestIdleCallback or setTimeout',
      'Optimize bundle splitting for Next.js pages',
      'Remove unused dependencies from package.json',
      'Use dynamic imports for heavy components like project galleries',
    ],
    'cumulative-layout-shift': [
      'Add explicit width/height attributes to all images',
      'Reserve space for embedded content in Projects section',
      'Avoid inserting content above existing content',
      'Use CSS aspect-ratio for consistent card layouts',
    ],
    'speed-index': [
      'Optimize font loading strategy with next/font',
      'Implement proper image optimization pipeline',
      'Use Next.js built-in CSS minification and tree-shaking',
      'Consider using ISR for static portfolio pages',
    ],
    'first-contentful-paint': [
      'Minimize critical rendering path resources',
      'Inline critical CSS for Hero section',
      'Use Next.js automatic static optimization',
      'Preload key resources in _document.tsx',
    ],
    'server-response-time': [
      'Optimize API routes for Contact form submissions',
      'Implement proper caching headers in next.config.js',
      'Use Edge Runtime for lightweight API endpoints',
      'Consider using Vercel Analytics for performance monitoring',
    ],
  };

  return recommendations[metric] || ['Review Lighthouse detailed report for specific recommendations'];
}

/**
 * Check portfolio-specific optimization issues
 */
function checkPortfolioSpecificIssues(auditResults, analysis) {
  // Check for image optimization
  const imageAudits = Object.keys(auditResults).filter((key) => key.includes('image') || key.includes('asset')); 
  if (imageAudits.length > 0) {
    const unoptimizedImages = imageAudits.filter((key) => auditResults[key].score < 1);
    if (unoptimizedImages.length > 0) {
      analysis.optimizations.push({
        category: 'Image Optimization',
        issue: `${unoptimizedImages.length} images not optimized`,
        recommendation: 'Use next/image component with proper width/height and format attributes',
      });
    }
  }

  // Check for JavaScript bundle size
  const mainBundleSize = auditResults['mainthread-work-breakdown'];
  if (mainBundleSize && mainBundleSize.numericValue > 500000) {
    analysis.criticalIssues.push({
      metric: 'javascript-bundle-size',
      value: `${(mainBundleSize.numericValue / 1024).toFixed(0)}KB`,
      threshold: '< 500KB',
      severity: 'critical',
      recommendation: [
        'Implement code splitting for Next.js pages',
        'Use dynamic imports for heavy components',
        'Remove unused dependencies from package.json',
        'Enable tree-shaking in next.config.js',
      ],
    });
  }

  // Check for font optimization
  const fontAudits = Object.keys(auditResults).filter((key) => key.includes('font') || key.includes('text')); 
  if (fontAudits.length > 0) {
    analysis.optimizations.push({
      category: 'Font Optimization',
      issue: 'Review font loading strategy',
      recommendation: 'Use next/font for automatic self-hosting and optimization',
    });
  }

  // Check for CSS optimization
  const cssAudits = Object.keys(auditResults).filter((key) => key.includes('css') || key.includes('style')); 
  if (cssAudits.length > 0) {
    analysis.optimizations.push({
      category: 'CSS Optimization',
      issue: 'Review CSS delivery',
      recommendation: 'Use Tailwind CSS with PurgeCSS for minimal CSS output',
    });
  }
}

/**
 * Generate comprehensive performance report
 */
function generateReport(auditResults, analysis) {
  const report = {
    title: 'Portfolio Performance Audit Report',
    generatedAt: new Date().toISOString(),
    summary: {
      overallScore: auditResults['performance-score']?.score || 0,
      criticalIssuesCount: analysis.criticalIssues.length,
      warningsCount: analysis.warnings.length,
      optimizationsCount: analysis.optimizations.length,
      status: getOverallStatus(analysis),
    },
    metrics: analysis.metricDetails,
    issues: {
      critical: analysis.criticalIssues,
      warnings: analysis.warnings,
      optimizations: analysis.optimizations,
    },
    portfolioChecks: generatePortfolioChecks(auditResults),
    recommendations: generateRecommendations(analysis),
  };

  return report;
}

/**
 * Determine overall status based on analysis
 */
function getOverallStatus(analysis) {
  if (analysis.criticalIssues.length > 0) return 'needs-improvement';
  if (analysis.warnings.length > 3) return 'needs-improvement';
  return 'excellent';
}

/**
 * Generate portfolio-specific checks
 */
function generatePortfolioChecks(auditResults) {
  const checks = {};

  Object.entries(PORTFOLIO_CHECKS).forEach(([section, config]) => {
    checks[section] = {
      name: config.name,
      results: config.checks.map((check) => ({
        id: check.id,
        description: check.description,
        status: 'pending',
        details: '',
      })),
    };
  });

  // Update checks based on actual audit results
  if (auditResults['largest-contentful-paint']) {
    checks.heroSection.results[0].status = auditResults['largest-contentful-paint'].score >= 0.9 ? 'pass' : 'fail';
  }

  if (auditResults['cumulative-layout-shift']) {
    checks.heroSection.results[1].status = auditResults['cumulative-layout-shift'].score >= 0.9 ? 'pass' : 'fail';
  }

  return checks;
}

/**
 * Generate actionable recommendations
 */
function generateRecommendations(analysis) {
  const recommendations = [];

  // Priority-based recommendations
  if (analysis.criticalIssues.length > 0) {
    recommendations.push({
      priority: 'high',
      category: 'Critical Performance Issues',
      actions: analysis.criticalIssues.flatMap((issue) => issue.recommendation),
    });
  }

  if (analysis.warnings.length > 0) {
    recommendations.push({
      priority: 'medium',
      category: 'Performance Warnings',
      actions: analysis.warnings.flatMap((warning) => warning.recommendation),
    });
  }

  if (analysis.optimizations.length > 0) {
    recommendations.push({
      priority: 'low',
      category: 'Optimization Opportunities',
      actions: analysis.optimizations.flatMap((opt) => opt.recommendation),
    });
  }

  // General portfolio optimizations
  recommendations.push({
    priority: 'medium',
    category: 'Portfolio-Specific Optimizations',
    actions: [
      'Implement proper image optimization with next/image for all portfolio images',
      'Use next/font for automatic font optimization and self-hosting',
      'Enable ISR (Incremental Static Regeneration) for portfolio pages',
      'Implement proper caching headers in next.config.js',
      'Use Edge Runtime for lightweight API endpoints',
      'Implement proper error boundaries for graceful degradation',
    ],
  });

  return recommendations;
}

/**
 * Save report to file
 */
function saveReport(report, outputPath = './performance-audit-report.json') {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`Performance audit report saved to: ${outputPath}`);
}

/**
 * Main execution function
 */
async function main() {
  const url = process.env.AUDIT_URL || 'http://localhost:3000';
  const outputDir = process.env.AUDIT_OUTPUT_DIR || './src/audit/reports';
  const outputPath = path.join(outputDir, 'performance-audit-report.json');

  console.log('Starting Performance Audit...');
  console.log(`Target URL: ${url}`);
  console.log(`Output directory: ${outputDir}`);

  // Run Lighthouse audit
  const lighthouseResult = await runLighthouseAudit(url);

  if (!lighthouseResult.success) {
    console.error('Audit failed:', lighthouseResult.error);
    process.exit(1);
  }

  // Analyze results
  const analysis = analyzeResults(lighthouseResult.audits);

  // Generate report
  const report = generateReport(lighthouseResult.audits, analysis);

  // Save report
  saveReport(report, outputPath);

  // Print summary
  console.log('\n=== Performance Audit Summary ===');
  console.log(`Overall Score: ${Math.round(report.summary.overallScore * 100)}%`);
  console.log(`Status: ${report.summary.status}`);
  console.log(`Critical Issues: ${report.summary.criticalIssuesCount}`);
  console.log(`Warnings: ${report.summary.warningsCount}`);
  console.log(`Optimization Opportunities: ${report.summary.optimizationsCount}`);

  if (report.issues.critical.length > 0) {
    console.log('\n=== Critical Issues ===');
    report.issues.critical.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.metric}: ${issue.value} (Threshold: ${issue.threshold})`);
      issue.recommendation.forEach((rec) => console.log(`   - ${rec}`));
    });
  }

  if (report.issues.warnings.length > 0) {
    console.log('\n=== Warnings ===');
    report.issues.warnings.forEach((warning, index) => {
      console.log(`${index + 1}. ${warning.metric}: ${warning.value} (Threshold: ${warning.threshold})`);
      warning.recommendation.forEach((rec) => console.log(`   - ${rec}`));
    });
  }

  console.log('\n=== Recommendations ===');
  report.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.priority.toUpperCase()}] ${rec.category}:`);
    rec.actions.forEach((action) => console.log(`   - ${action}`));
  });

  console.log('\nAudit complete!');
  return report;
}

// Export functions for programmatic use
module.exports = {
  runLighthouseAudit,
  analyzeResults,
  generateReport,
  saveReport,
  PERFORMANCE_THRESHOLDS,
  PORTFOLIO_CHECKS,
  getRecommendation,
  main,
};

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Audit execution failed:', error);
    process.exit(1);
  });
}