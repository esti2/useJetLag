import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, TextInput, SimpleGrid, Loader, Center, Text, Button, Group } from '@mantine/core';
import { getTripBySlug, updateTripTitle } from '../api/trips.api';
import PictureItem from '../components/upload/PictureItem';

export default function TripPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await getTripBySlug(slug);
        setTitle(data.trip.title);
        setPictures(data.pictures || []);
      } catch (error) {
        console.error("Failed to load trip", error);
        alert("Trip not found");
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchData();
    }
  }, [slug]);

  async function handleSave() {
    setSaving(true);
    try {
      const { data } = await updateTripTitle(slug, title);
      navigate(`/trip/${data.trip.slug}`);
    } catch (err) {
      console.error(err);
      alert('Failed to save title');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Container pt="xl" size="lg">
      <Group justify="center" align="center" mb="xl">
        <TextInput
          size="xl"
          variant="unstyled"
          styles={{ input: { fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' } }}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <Button onClick={handleSave} loading={saving} color="blue" variant="light">
          Save Title
        </Button>
      </Group>

      {loading ? (
        <Center mt="xl"><Loader /></Center>
      ) : pictures.length === 0 ? (
        <Center mt="xl"><Text c="dimmed">No pictures found for this trip.</Text></Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {pictures.map((pic) => (
            <PictureItem key={pic.id} picture={pic} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
