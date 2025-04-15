import { Image, StyleSheet } from 'react-native';
import { BooksEmoji } from '@/components/BooksEmoji';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';

export default function BooksScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Books</ThemedText>
        <BooksEmoji />
        
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText >Some books that I read in 2025.</ThemedText>
      </ThemedView>

      
      <Collapsible title="Voyage Autour de Ma Chambre">
        <ThemedText>
            <ThemedText type="defaultSemiBold">Author</ThemedText>: Xavier de Maistre
        </ThemedText>
        <ThemedText>
            <ThemedText type="defaultSemiBold">Published</ThemedText>: 1794 
        </ThemedText>
        <ThemedText>
            <ThemedText type="defaultSemiBold">Pages</ThemedText>: 143
        </ThemedText>
        <Collapsible title="cover">
            <Image source={require('@/assets/images/coverAJourneyAroundMyRoom.jpg')} />
        </Collapsible>
        
      </Collapsible>

      <Collapsible title="The Picture of Dorian Gray">
        <ThemedText>
            <ThemedText type="defaultSemiBold">Author</ThemedText>: Oscar Wilde
        </ThemedText>
        <ThemedText>
            <ThemedText type="defaultSemiBold">Published</ThemedText>: 1890
        </ThemedText>
        <ThemedText>
            <ThemedText type="defaultSemiBold">Pages</ThemedText>: 319
        </ThemedText>
        <Collapsible title="cover">
            <Image source={require('@/assets/images/coverThePictureOfDorianGray.jpg')} />
        </Collapsible>
        
      </Collapsible>

      <Collapsible title="The Invisible Man">
        <ThemedText>
            <ThemedText type="defaultSemiBold">Author</ThemedText>: H.G. Wells
        </ThemedText>
        <ThemedText>
            <ThemedText type="defaultSemiBold">Published</ThemedText>: 1897
        </ThemedText>
        <ThemedText>
            <ThemedText type="defaultSemiBold">Pages</ThemedText>: 216
        </ThemedText>
        <Collapsible title="cover">
            <Image source={require('@/assets/images/coverTheInvisibleMan.jpg')} />
        </Collapsible>
        
      </Collapsible>


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
