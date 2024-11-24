import { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png';

import { THEME } from '../../theme';
import { styles } from "./styles";

import { GameParams } from '../../@types/navigation';

import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Background } from '../../components/Background';
import { DuoMatch } from '../../components/DuoMatch';
import { Heading } from '../../components/Heading';

import { MY_IP} from '../../utils/constants';

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;

    function handleGoBack() {
        navigation.goBack();
    }

    async function getDiscordUser(adsId: string) {
        fetch(`${MY_IP}/ads/${adsId}/discord`)
            .then(response => response.json())
            .then(data => setDiscordDuoSelected(data.discord))
    }

    // Function to map local images using 'require' based on the relative URL
    const getImage = (bannerUrl: string) => {
        switch (bannerUrl) {
            case "./../../assets/games/game-1.png":
                return require("../../assets/games/game-1.png");
            case "./../../assets/games/game-2.png":
                return require("../../assets/games/game-2.png");
            case "./../../assets/games/game-3.png":
                return require("../../assets/games/game-3.png");
            case "./../../assets/games/game-4.png":
                return require("../../assets/games/game-4.png");
            case "./../../assets/games/game-5.png":
                return require("../../assets/games/game-5.png");
            case "./../../assets/games/game-6.png":
                return require("../../assets/games/game-6.png");
            default:
                return null; // If no match is found, it can return null or a default image
        }
    };

    useEffect(() => {
        fetch(`${MY_IP}/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDuos(data))
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo 
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />

                    <View style={styles.right} />
                </View>

                {/* Here is where you use the getImage function to load the correct image */}
                <Image
                    source={getImage(game.bannerUrl)} // Using the getImage function to resolve the image path
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading 
                    title={game.title}
                    subtitle="Connect and start playing!"
                />

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            No ads published yet
                        </Text>
                    )}
                />

                <DuoMatch 
                    visible={discordDuoSelected.length > 0}
                    discord={discordDuoSelected}
                    onClose={() => setDiscordDuoSelected('')}
                />
            </SafeAreaView>
        </Background>
    );
}
