/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useCallback, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { useTasks } from '@nx-react-shared-components/data-access';

export const App = () => {
  const textInputValue = useRef<string>('');
  const scrollViewRef = useRef<null | ScrollView>(null);
  const { addTask, removeTask, tasks, getTasks } =  useTasks('http://10.0.2.2:3333/api');

  const onAddTask = useCallback(async () => {
    console.log('textInput.current', textInputValue.current)
    if (!textInputValue.current) return;
    await addTask(textInputValue.current);

    textInputValue.current = '';
  }, [addTask]);
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          ref={(ref) => {
            scrollViewRef.current = ref;
          }}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Text style={styles.title}>My tasks</Text>
          {
            tasks.map(task => <Text style={{ color: 'red' }} key={task.id}>{task.text}</Text>)
          }
          <TextInput placeholder='task name' onChangeText={(text) => textInputValue.current = text} />
          <Button title='Add task' onPress={onAddTask} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
  }
});

export default App;
