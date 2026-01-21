jest.mock('axios', () => ({}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileList from '../components/FileList';
import { useFiles } from '../hooks/useFiles';

jest.mock('../hooks/useFiles', () => ({
  useFiles: jest.fn()
}));

describe('FileList Component', () => {

  test('affiche le loader pendant le chargement', () => {
    useFiles.mockReturnValue({
      files: [],
      loading: true,
      error: null,
      refetch: jest.fn()
    });

    render(<FileList />);
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();
  });

  test('affiche les fichiers', () => {
    useFiles.mockReturnValue({
      files: [{ name: 'document.pdf' }],
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    render(<FileList />);
    expect(screen.getByText('document.pdf')).toBeInTheDocument();
  });

  test('affiche un message quand aucun fichier', () => {
    useFiles.mockReturnValue({
      files: [],
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    render(<FileList />);
    expect(screen.getByText(/Aucun fichier/i)).toBeInTheDocument();
  });

});
