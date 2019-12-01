import React, { ChangeEvent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack';
import { TextInput } from 'react-native-gesture-handler';

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>
}

class LoginScreen extends React.Component<Props> {
  state = {
    username: "",
    password: ""
  }

  static navigationOptions = ({ navigation }): NavigationStackOptions => {
    return {
      title: "Login Screen",
      headerRight: () => (
        <Button
        onPress={navigation.getParam('increaseCount')}
        title="Plus 1"
        color="#fff"
        />
      )
    }
  }

  // componentDidMount() {
  //   this.props.navigation.setParams({ increaseCount: this._increaseCount })
  // }

  // _increaseCount = () => {
  //   this.setState({ count: this.state.count + 1 })
  // }

  // TODO: Figure out type for change event
  handleInputChange = (key: string) => (text: string) => {
    this.setState({
      [key]: text
    });
  }

  handleSubmit = () => {
    // if (this.state.username.length > 0 && this.state.password.length > 0) {
      this.props.navigation.navigate('Home')
    // } else {
    //   alert("Please fill in both fields");
    // }
  }

  render() {
    return (
    <View style={styles.container}>
      <Text>Username Input</Text>
      <TextInput
        style={styles.input}
        onChangeText={this.handleInputChange("username")}
        value={this.state.username}
        autoCompleteType="email"
        autoFocus
      />
      <Text>Password Input</Text>
      <TextInput 
        style={styles.input}
        onChangeText={this.handleInputChange("password")}
        value={this.state.password}
        autoCompleteType="password"
      />
      <Button
        title="Go to Home Page"
        onPress={this.handleSubmit} 
        // onPress{() => navigation.navigate('Home', { userId: 2, randomKey: 'asdasd' })}
        // onPress={() => navigation.push('Home')} 
        // onPress={() => navigation.goBack()} 
      />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 15,
    marginBottom: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {

  }
});


export default LoginScreen;