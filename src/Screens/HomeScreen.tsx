import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';
import { Text, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../API/api';

import { useAuthContext } from '../Context/AuthContext';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const authContext = useAuthContext();
  const [locationList, setLocationList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [direction, setDirection] = React.useState<Direction>();

  useEffect(() => {
    API('get', 'location/get').then((data) =>
      setLocationList(data.data.data.locationList)
    );
  }, []);

  const saveLocation = async () => {
    setIsLoading(true);
    const res = await API('post', 'location/create', {
      name: locationName,
      address,
    });
    const newLocation = res.data.data.location;
    const locationArray = [...locationList, newLocation];
    setLocationList(locationArray);
    setIsLoading(false);
    setIsModalVisible(false);
    setLocationName('');
    setAddress('');
  };

  const onButtonPress = (direction: Direction) => {
    setDirection(direction);
  };

  return (
    <>
      <HomeScreenWrapper>
        <LocationView>
          {locationList.map((location) => {
            return (
              <LocationContainer
                key={location._id}
                onPress={() =>
                  navigation.navigate('TodoList', { locationId: location._id })
                }
              >
                <TopLineView>
                  <NameText>{location.name}</NameText>
                  <Text>North</Text>
                </TopLineView>
                <Text>{location.address}</Text>
              </LocationContainer>
            );
          })}
        </LocationView>
        <FooterWrapper>
          <Button mode='contained' onPress={() => setIsModalVisible(true)}>
            Add new location
          </Button>
          <Button onPress={() => authContext.signOut()}>Sign out</Button>
        </FooterWrapper>
      </HomeScreenWrapper>
      <Modal animationType='slide' transparent={true} visible={isModalVisible}>
        <ModalBody>
          <ModalView>
            <Text>Add a new location</Text>
            <TextInput
              label='Location name'
              onChangeText={(value: string) => setLocationName(value)}
              value={locationName}
              style={{ width: 250, marginTop: 20 }}
            />
            <TextInput
              label='Address'
              onChangeText={(value: string) => setAddress(value)}
              value={address}
              style={{ width: 250, marginTop: 20, marginBottom: 20 }}
            />
            <ButtonWrapper>
              <Button
                mode={direction !== 'north' ? 'outlined' : 'contained'}
                onPress={() => {
                  setDirection('north');
                }}
                compact
              >
                <Text>North</Text>
              </Button>
              <Button
                mode={direction !== 'south' ? 'outlined' : 'contained'}
                onPress={() => {
                  setDirection('south');
                }}
                compact
              >
                <Text>South</Text>
              </Button>
              <Button
                mode={direction !== 'local' ? 'outlined' : 'contained'}
                onPress={() => {
                  setDirection('local');
                }}
                compact
              >
                <Text>Local</Text>
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button mode='contained' onPress={() => saveLocation()}>
                {isLoading ? <ActivityIndicator /> : <Text>Save location</Text>}
              </Button>
              <Button mode='text' onPress={() => setIsModalVisible(false)}>
                <Text>Cancel</Text>
              </Button>
            </ButtonWrapper>
          </ModalView>
        </ModalBody>
      </Modal>
    </>
  );
};

export default HomeScreen;

type Direction = 'north' | 'south' | 'local';

const HomeScreenWrapper = styled.View`
  flex: 1;
`;

const FooterWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 40px;
`;

const LocationView = styled.ScrollView`
  height: 615px;
`;
const LocationContainer = styled.TouchableOpacity`
  margin-top: 10px;
`;

const ModalBody = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  height: 350px;
  width: 350px;
`;

const NameText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const TopLineView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: space-between;
  width: 250px;
`;
