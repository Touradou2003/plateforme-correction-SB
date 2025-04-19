import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Results } from '../Results';
import { correctionService } from '../../../services/correctionService';

jest.mock('../../../services/correctionService');

describe('Results', () => {
  const mockResults = [
    {
      id: '1',
      studentName: 'Étudiant 1',
      subjectTitle: 'Sujet 1',
      score: 80,
      feedback: 'Excellent travail',
      correctedAt: '2024-01-01',
    },
    {
      id: '2',
      studentName: 'Étudiant 2',
      subjectTitle: 'Sujet 2',
      score: 75,
      feedback: 'Bon travail',
      correctedAt: '2024-01-02',
    },
  ];

  beforeEach(() => {
    (correctionService.getAll as jest.Mock).mockResolvedValue({
      data: mockResults,
      total: 2,
    });
  });

  it('renders results table', async () => {
    render(<Results />);
    
    await waitFor(() => {
      expect(screen.getByText('Étudiant 1')).toBeInTheDocument();
      expect(screen.getByText('Étudiant 2')).toBeInTheDocument();
      expect(screen.getByText('Sujet 1')).toBeInTheDocument();
      expect(screen.getByText('Sujet 2')).toBeInTheDocument();
      expect(screen.getByText('80')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
    });
  });

  it('shows statistics', async () => {
    render(<Results />);
    
    await waitFor(() => {
      expect(screen.getByText('Moyenne générale')).toBeInTheDocument();
      expect(screen.getByText('77.5')).toBeInTheDocument();
      expect(screen.getByText('Nombre total de corrections')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    (correctionService.getAll as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<Results />);
    
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('shows feedback details', async () => {
    render(<Results />);
    
    await waitFor(() => {
      expect(screen.getByText('Excellent travail')).toBeInTheDocument();
      expect(screen.getByText('Bon travail')).toBeInTheDocument();
    });
  });

  it('shows correction dates', async () => {
    render(<Results />);
    
    await waitFor(() => {
      expect(screen.getByText('01/01/2024')).toBeInTheDocument();
      expect(screen.getByText('02/01/2024')).toBeInTheDocument();
    });
  });
}); 