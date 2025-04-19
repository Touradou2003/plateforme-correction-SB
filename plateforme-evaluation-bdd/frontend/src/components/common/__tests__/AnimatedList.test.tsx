import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedList from '../AnimatedList';
import { motion } from 'framer-motion';

// Mock framer-motion to avoid animation delays in tests
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('AnimatedList', () => {
  const mockItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  const renderItem = (item: typeof mockItems[0]) => (
    <div key={item.id} data-testid={`item-${item.id}`}>
      {item.name}
    </div>
  );

  it('renders all items in the list', () => {
    render(
      <AnimatedList
        items={mockItems}
        renderItem={renderItem}
      />
    );

    mockItems.forEach(item => {
      expect(screen.getByTestId(`item-${item.id}`)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('applies custom className when provided', () => {
    const customClassName = 'custom-list';
    render(
      <AnimatedList
        items={mockItems}
        renderItem={renderItem}
        className={customClassName}
      />
    );

    const listElement = screen.getByTestId('animated-list');
    expect(listElement).toHaveClass(customClassName);
  });

  it('renders empty list when no items are provided', () => {
    render(
      <AnimatedList
        items={[]}
        renderItem={renderItem}
      />
    );

    const listElement = screen.getByTestId('animated-list');
    expect(listElement).toBeInTheDocument();
    expect(listElement.children).toHaveLength(0);
  });

  it('renders items with correct data-testid attributes', () => {
    render(
      <AnimatedList
        items={mockItems}
        renderItem={renderItem}
      />
    );

    mockItems.forEach(item => {
      const itemElement = screen.getByTestId(`item-${item.id}`);
      expect(itemElement).toBeInTheDocument();
      expect(itemElement.textContent).toBe(item.name);
    });
  });
}); 