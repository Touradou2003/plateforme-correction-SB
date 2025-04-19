import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Submissions } from '../Submissions';
import { submissionService } from '../../../services/submissionService';

jest.mock('../../../services/submissionService');

describe('Submissions', () => {
  const mockSubmissions = [
    {
      id: '1',
      subjectId: '1',
      studentId: '1',
      content: 'Contenu de la soumission 1',
      status: 'pending',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      subjectId: '2',
      studentId: '2',
      content: 'Contenu de la soumission 2',
      status: 'pending',
      createdAt: '2024-01-02',
    },
  ];

  beforeEach(() => {
    (submissionService.getAll as jest.Mock).mockResolvedValue({
      data: mockSubmissions,
      total: 2,
    });
  });

  it('renders submissions table', async () => {
    render(<Submissions />);
    
    await waitFor(() => {
      expect(screen.getByText('Contenu de la soumission 1')).toBeInTheDocument();
      expect(screen.getByText('Contenu de la soumission 2')).toBeInTheDocument();
      expect(screen.getByText('pending')).toBeInTheDocument();
    });
  });

  it('shows submission details when clicking view button', async () => {
    render(<Submissions />);
    
    await waitFor(() => {
      expect(screen.getByText('Contenu de la soumission 1')).toBeInTheDocument();
    });
    
    const viewButton = screen.getAllByText('Voir')[0];
    fireEvent.click(viewButton);
    
    expect(screen.getByText('Détails de la soumission')).toBeInTheDocument();
    expect(screen.getByText('Contenu de la soumission 1')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (submissionService.getAll as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<Submissions />);
    
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('shows error message when loading fails', async () => {
    (submissionService.getAll as jest.Mock).mockRejectedValue(new Error('Erreur de chargement'));
    
    render(<Submissions />);
    
    await waitFor(() => {
      expect(screen.getByText('Erreur lors du chargement des soumissions')).toBeInTheDocument();
    });
  });

  it('filters submissions by status', async () => {
    render(<Submissions />);
    
    const filterSelect = screen.getByLabelText('Statut');
    fireEvent.change(filterSelect, { target: { value: 'pending' } });
    
    await waitFor(() => {
      expect(submissionService.getAll).toHaveBeenCalledWith({ status: 'pending' });
    });
  });
}); 