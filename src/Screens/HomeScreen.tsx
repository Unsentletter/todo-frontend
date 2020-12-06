import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SERVER_URL } from '../../constants';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [locationList, setLocationList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(SERVER_URL + 'location/get')
      .then((res) => res.json())
      .then((data) => {
        setLocationList(data.data.locationList);
      });
  }, []);

  const saveLocation = async () => {
    setIsLoading(true);
    const response = await fetch(SERVER_URL + 'location/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: locationName, address }),
    });
    const newLocation = await response.json();
    const locationArray = [...locationList, newLocation.data.location];
    setLocationList(locationArray);
    setIsLoading(false);
    setIsModalVisible(false);
    setLocationName('');
    setAddress('');
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
                  navigation.push('Todos', { locationId: location._id })
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
            <Button mode='contained' onPress={() => saveLocation()}>
              {isLoading ? <ActivityIndicator /> : <Text>Save location</Text>}
            </Button>
          </ModalView>
        </ModalBody>
      </Modal>
    </>
  );
};

export default HomeScreen;

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
  height: 300px;
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
