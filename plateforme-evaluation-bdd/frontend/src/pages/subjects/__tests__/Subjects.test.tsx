import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Subjects } from '../Subjects';
import { subjectService } from '../../../services/subjectService';

jest.mock('../../../services/subjectService');

describe('Subjects', () => {
  const mockSubjects = [
    {
      id: '1',
      title: 'Sujet 1',
      description: 'Description du sujet 1',
      deadline: '2024-12-31',
      status: 'active',
    },
    {
      id: '2',
      title: 'Sujet 2',
      description: 'Description du sujet 2',
      deadline: '2024-12-30',
      status: 'active',
    },
  ];

  beforeEach(() => {
    (subjectService.getAll as jest.Mock).mockResolvedValue({
      data: mockSubjects,
      total: 2,
    });
  });

  it('renders subjects table', async () => {
    render(<Subjects />);
    
    await waitFor(() => {
      expect(screen.getByText('Sujet 1')).toBeInTheDocument();
      expect(screen.getByText('Sujet 2')).toBeInTheDocument();
      expect(screen.getByText('Description du sujet 1')).toBeInTheDocument();
      expect(screen.getByText('Description du sujet 2')).toBeInTheDocument();
    });
  });

  it('shows create subject form when button is clicked', async () => {
    render(<Subjects />);
    
    const createButton = screen.getByText('Créer un sujet');
    fireEvent.click(createButton);
    
    expect(screen.getByLabelText('Titre')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Date limite')).toBeInTheDocument();
  });

  it('creates a new subject', async () => {
    (subjectService.create as jest.Mock).mockResolvedValue({
      data: {
        id: '3',
        title: 'Nouveau sujet',
        description: 'Description du nouveau sujet',
        deadline: '2024-12-29',
        status: 'active',
      },
    });

    render(<Subjects />);
    
    const createButton = screen.getByText('Créer un sujet');
    fireEvent.click(createButton);
    
    fireEvent.change(screen.getByLabelText('Titre'), {
      target: { value: 'Nouveau sujet' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Description du nouveau sujet' },
    });
    fireEvent.change(screen.getByLabelText('Date limite'), {
      target: { value: '2024-12-29' },
    });
    
    const submitButton = screen.getByText('Créer');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(subjectService.create).toHaveBeenCalledWith({
        title: 'Nouveau sujet',
        description: 'Description du nouveau sujet',
        deadline: '2024-12-29',
      });
    });
  });

  it('shows loading state', () => {
    (subjectService.getAll as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<Subjects />);
    
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('shows error message when creation fails', async () => {
    (subjectService.create as jest.Mock).mockRejectedValue(new Error('Erreur de création'));
    
    render(<Subjects />);
    
    const createButton = screen.getByText('Créer un sujet');
    fireEvent.click(createButton);
    
    fireEvent.change(screen.getByLabelText('Titre'), {
      target: { value: 'Nouveau sujet' },
    });
    
    const submitButton = screen.getByText('Créer');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la création du sujet')).toBeInTheDocument();
    });
  });
}); 