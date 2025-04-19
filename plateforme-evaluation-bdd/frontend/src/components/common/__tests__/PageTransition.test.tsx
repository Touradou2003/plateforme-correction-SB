import React from 'react';
import { render, screen } from '@testing-library/react';
import PageTransition from '../PageTransition';
import { motion } from 'framer-motion';

// Mock framer-motion to avoid animation delays in tests
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('PageTransition', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Content';
    render(
      <PageTransition>
        <div>{testContent}</div>
      </PageTransition>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies motion.div with correct props', () => {
    const testContent = 'Test Content';
    render(
      <PageTransition>
        <div>{testContent}</div>
      </PageTransition>
    );

    const motionDiv = screen.getByText(testContent).parentElement;
    expect(motionDiv).toHaveAttribute('data-testid', 'page-transition');
  });

  it('renders multiple children correctly', () => {
    render(
      <PageTransition>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </PageTransition>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('renders empty children without errors', () => {
    render(
      <PageTransition>
        <></>
      </PageTransition>
    );
    const motionDiv = screen.getByTestId('page-transition');
    expect(motionDiv).toBeInTheDocument();
    expect(motionDiv.children).toHaveLength(0);
  });
}); 