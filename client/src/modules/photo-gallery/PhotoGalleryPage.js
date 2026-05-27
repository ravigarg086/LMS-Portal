import RevealUp from '../home/components/RevealUp';
import DashboardShell from '../../shared/layout/DashboardShell';
import PhotoGalleryGrid from './components/PhotoGalleryGrid';
import { usePhotoGallery } from './hooks/usePhotoGallery';
import './photo-gallery.css';

function PhotoGalleryPage() {
  const { items } = usePhotoGallery();

  return (
    <DashboardShell
      activeId="photo-gallery"
      pageClassName="photo-gallery-page"
      mainClassName="photo-gallery-page__main"
    >
      <RevealUp>
        <PhotoGalleryGrid items={items} />
      </RevealUp>
    </DashboardShell>
  );
}

export default PhotoGalleryPage;
