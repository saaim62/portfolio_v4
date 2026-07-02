import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';

describe('Homepage E2E Tests - Saim Asif Portfolio', () => {
  beforeEach(() => {
    cy.visit('/');
    // Ensure dark mode is active
    cy.get('html').should('have.class', 'dark');
  });

  describe('Hero Section', () => {
    it('should display the correct name and professional title', () => {
      cy.get('[data-testid="hero-name"]')
        .should('be.visible')
        .and('contain.text', 'Saim Asif');

      cy.get('[data-testid="hero-title"]')
        .should('be.visible')
        .and('contain.text', 'Senior Software Engineer | Full Stack & AI Specialist');
    });

    it('should display location and contact summary in hero', () => {
      cy.get('[data-testid="hero-contact-summary"]')
        .should('be.visible')
        .and('contain.text', 'New Jersey, United States');

      cy.get('[data-testid="hero-email-link"]')
        .should('have.attr', 'href', 'mailto:saaim62@gmail.com');
    });
  });

  describe('Navigation', () => {
    it('should navigate to About section when About link is clicked', () => {
      cy.get('[data-testid="nav-about"]')
        .click();
      cy.url().should('include', '#about');
      cy.get('[data-testid="section-about"]')
        .should('be.visible');
    });

    it('should navigate to Projects section when Projects link is clicked', () => {
      cy.get('[data-testid="nav-projects"]')
        .click();
      cy.url().should('include', '#projects');
      cy.get('[data-testid="section-projects"]')
        .should('be.visible');
    });

    it('should navigate to Contact section when Contact link is clicked', () => {
      cy.get('[data-testid="nav-contact"]')
        .click();
      cy.url().should('include', '#contact');
      cy.get('[data-testid="section-contact"]')
        .should('be.visible');
    });
  });

  describe('About Me Section', () => {
    it('should display the professional summary', () => {
      cy.get('[data-testid="section-about"]')
        .within(() => {
          cy.contains('Full Stack AI Engineer & Technical Team Lead')
            .should('be.visible');
          cy.contains('over 7 years of experience')
            .should('be.visible');
          cy.contains('HIPAA compliance')
            .should('be.visible');
        });
    });

    it('should display key technical skills', () => {
      cy.get('[data-testid="section-about"]')
        .within(() => {
          cy.contains('Technical Skills').should('be.visible');
          
          // AI & Automation
          cy.contains('Ollama').should('be.visible');
          cy.contains('Qwen').should('be.visible');
          cy.contains('DeepSeek').should('be.visible');
          cy.contains('n8n Orchestration').should('be.visible');
          
          // Frontend
          cy.contains('Next.js').should('be.visible');
          cy.contains('React').should('be.visible');
          cy.contains('TypeScript').should('be.visible');
          cy.contains('Tailwind CSS').should('be.visible');
          
          // Backend
          cy.contains('NestJS').should('be.visible');
          cy.contains('FastAPI').should('be.visible');
          cy.contains('Microservices Architecture').should('be.visible');
          
          // Databases
          cy.contains('MySQL').should('be.visible');
          cy.contains('MongoDB').should('be.visible');
          cy.contains('PostgreSQL').should('be.visible');
        });
    });

    it('should display professional experience details', () => {
      cy.get('[data-testid="section-about"]')
        .within(() => {
          // Airiodion Group
          cy.contains('Airiodion Group').should('be.visible');
          cy.contains('Senior Full Stack & AI Engineer').should('be.visible');
          cy.contains('Casemanagementhub.org').should('be.visible');
          cy.contains('70+ active high-paying clients').should('be.visible');

          // FORTNA
          cy.contains('FORTNA').should('be.visible');
          cy.contains('Senior Software Engineer').should('be.visible');
          cy.contains('Warehouse Management Systems').should('be.visible');
          cy.contains('Zebra enterprise hardware').should('be.visible');

          // Connectavo
          cy.contains('Connectavo').should('be.visible');
          cy.contains('Android Engineer').should('be.visible');
          cy.contains('4 million active users').should('be.visible');
        });
    });
  });

  describe('Projects Gallery', () => {
    it('should list all key projects with descriptions', () => {
      cy.get('[data-testid="section-projects"]')
        .within(() => {
          // Autonomous AI Job-Scraping & Data Pipeline
          cy.contains('Autonomous AI Job-Scraping & Data Pipeline').should('be.visible');
          cy.contains('n8n data harvesting pipeline').should('be.visible');
          cy.contains('qwen3.6:35b').should('be.visible');
          cy.contains('Ollama').should('be.visible');

          // Case Management Hub
          cy.contains('Case Management Hub (SaaS Platform)').should('be.visible');
          cy.contains('HIPAA-compliant SaaS platform').should('be.visible');
          cy.contains('multi-tenancy').should('be.visible');

          // PackTrack
          cy.contains('PackTrack (Enterprise Scanner Solution)').should('be.visible');
          cy.contains('Zebra hardware').should('be.visible');
          cy.contains('PAX A920').should('be.visible');

          // Seated
          cy.contains('Seated').should('be.visible');
          cy.contains('restaurant reservation application').should('be.visible');
          cy.contains('4 million active users').should('be.visible');

          // Connectavo Project
          cy.contains('Connectavo').should('be.visible');
          cy.contains('predictive analytics').should('be.visible');
        });
    });
  });

  describe('Contact Section', () => {
    it('should display correct contact information', () => {
      cy.get('[data-testid="section-contact"]')
        .within(() => {
          cy.contains('Contact').should('be.visible');
          
          // Email
          cy.get('[data-testid="contact-email"]')
            .should('contain.text', 'saaim62@gmail.com')
            .and('have.attr', 'href', 'mailto:saaim62@gmail.com');

          // Phone
          cy.get('[data-testid="contact-phone"]')
            .should('contain.text', '+92 320 6090154');

          // GitHub Link
          cy.get('[data-testid="contact-github-link"]')
            .should('have.attr', 'href')
            .and('include', 'github.com');

          // LinkedIn Link
          cy.get('[data-testid="contact-linkedin-link"]')
            .should('have.attr', 'href')
            .and('include', 'linkedin.com');
        });
    });

    it('should validate contact form fields structure', () => {
      cy.get('[data-testid="section-contact"]')
        .within(() => {
          cy.get('[data-testid="form-name-input"]')
            .should('have.attr', 'placeholder', 'Your Name');

          cy.get('[data-testid="form-email-input"]')
            .should('have.attr', 'type', 'email')
            .and('have.attr', 'placeholder', 'Your Email');

          cy.get('[data-testid="form-message-input"]')
            .should('have.attr', 'placeholder', 'Your Message');

          cy.get('[data-testid="form-submit-button"]')
            .should('contain.text', 'Send Message')
            .and('be.enabled');
        });
    });
  });

  describe('Design & Accessibility', () => {
    it('should apply dark mode styling correctly', () => {
      cy.get('body').should('have.class', 'dark-mode');
      cy.get('html').should('have.attr', 'data-theme', 'dark');
      
      // Verify contrast by checking background color is dark
      cy.get('body')
        .invoke('css', 'background-color')
        .should('satisfy', (color) => {
          return color.includes('rgb(0, 0, 0)') || 
                 color.includes('rgb(17, 24, 39)') || 
                 color.includes('rgb(15, 23, 42)');
        });
    });

    it('should have responsive layout indicators', () => {
      // Check for mobile menu trigger
      cy.get('[data-testid="mobile-menu-toggle"]')
        .should('exist');
      
      // Verify viewport meta tag
      cy.get('meta[name="viewport"]')
        .should('have.attr', 'content', 'width=device-width, initial-scale=1');
    });
  });
});