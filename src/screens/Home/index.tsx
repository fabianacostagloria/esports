import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { GameCard, GameCardProps } from "../../components/GameCard";
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { MY_IP } from "../../utils/constants";
import { styles } from "./styles";

import logoImg from '../../assets/logo-nlw-esports.png';

export function Home() {

    const [games, setGames] = useState<GameCardProps[]>([]);

    const navigation = useNavigation();

    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', { id, title, bannerUrl });
    }

    console.log(MY_IP);
    
    useEffect(() => {
        const fetchGames = async () => {
          try {
            const response = await fetch(`${MY_IP}/games`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Received data:', data);
            setGames(data);
          } catch (error) {
            console.error('Network error fetching games:', error);
          }
        };
      
        fetchGames();
      }, []);
      

    return (
        <Background>
            <SafeAreaView style={styles.container}>            
                
                <Image
                    source={logoImg}
                    style={styles.logo}
                />

                <Heading
                    title="Find your duo!"
                    subtitle="Select the game you want to play..."
                />

                <FlatList 
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <GameCard data={item} onPress={() => handleOpenGame(item)} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />

            </SafeAreaView>
        </Background>
    );
}