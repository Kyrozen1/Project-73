import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import db from '../config';


export default class ReadStoryScreen extends React.Component{
    constructor(props){
      super(props);
      this.state={
        allStories:[],
        dataSource:null,
        search:'',
      }
    }
    componentDidMount = async ()=>{
      const stories = await db.collections("submitions").get()
      stories.docs.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories, doc.data()]
        })
      })
    }
    searchFilterFunction = async (text)=>{
      var enteredText = text.split("") 
      var searchText=enteredText
      console.log(searchText)
      if (searchText){
        const submition =  await db.collection("submitions").where('Title','==',text).get()
        submition.docs.map((doc)=>{
          this.setState({
            allStories:[...this.state.allStories,doc.data()],
            dataSource: doc
          })
        })
      }
    }
    render(){
        return(
          <View style={{ flex: 1, marginTop:50}}>
          <View>
          <TextInput
            style={styles.bar}
            placeholder="Enter Story Title"
            onChangeText={(text)=>{this.setState({search:text})}}
          />
          <TouchableOpacity
          style={styles.searchButton}
            onPress={()=>{this.searchFilterFunction(this.state.search)}}
          >
            <Text style={{color:'white'}}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.allStories}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Author: " + item.Author}</Text>
              <Text>{"Story title: " + item.Title}</Text>
              <Text>{"Story: " + item.Story}</Text>
              <Text>{"Date: " + item.data.toDate()}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
        />
        </View>
        )
    }
}

const styles = StyleSheet.create({
  searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green',
      marginTop:-30,
      marginLeft:310
    },
    bar:{
      borderWidth:2,
      height:30,
      width:310,
      paddingLeft:10,
      color:'black',
    },
})