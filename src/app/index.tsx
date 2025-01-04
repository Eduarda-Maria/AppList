import { 
  View,
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Pressable
} from 'react-native'; 
import { useState } from 'react'

import {LinearGradient} from 'expo-linear-gradient';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




interface taksPropos{
  id: number;
  name: string;
  complete: boolean
}

export default function index() {
  const [task, setTask] = useState<taksPropos[]>([]);
  const [item, setItem] = useState(""); 


 function saveItem(){
   if(item.trim()){
      setTask([...task, {id: task.length + 1, name: item, complete:false}]);
      setItem("");  
     }
  }

  function toggleComplete(id: number){
    const updateTask = task.map((task) => 
      task.id === id? {...task, complete : !task.complete} : task);
    setTask(updateTask);
  }

 function removeTask(id:number){
    const remove = task.filter((task) => task.id  !== id);
    setTask(remove)
 }
  

  return (
   <LinearGradient colors={['#ffffff', '#7E64FF',]} style={{width:'100%', height:'100%'}}>
      <View style={styles.container} >
            <Text style={styles.title}>To-Do List</Text>
            <TextInput
            style={styles.input} 
              placeholder='add new Task' 
              placeholderTextColor='#000000'
            onChangeText={setItem}
            />

        


          <TouchableOpacity
            onPress={saveItem} 
            style={styles.button}
          >
            <Text style={styles.textButtom}>Add Task</Text>
          </TouchableOpacity>
      

          <View  style={styles.cardContainer}>
        
            {task.map( (item) =>(
              <View key={item.id} style={styles.card} >

                <View style={styles.infoCard}>

                  <Pressable onPress={() => toggleComplete(item.id)}>
                    {item.complete?(
                        <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color="black" />
                      ) : (
                        <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="black"/>
                      )
                    }
                  </Pressable>
                  
                  <Text style={item.complete ? styles.textItem1 : styles.textItem}>{item.name}</Text> 
                </View>
                  <TouchableOpacity onPress={() =>removeTask(item.id) }>
                    <MaterialCommunityIcons name="delete" size={24} color="black" />
                  </TouchableOpacity>
                
              </View>
        
            ))}

          </View>
      </View>
   </LinearGradient> 

  
  ); 
}


const styles= StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:38,
    paddingTop:60,
    alignItems:"center"
  },
  title:{
    color:"#17161a",
    fontSize:24,
    fontWeight:"bold",
    marginBottom:40,
  }, 
  input:{
    width:'100%',
    height:44,
    borderWidth:1,
    borderRadius:12,
    borderColor:"#8c7acc",
    paddingHorizontal:20,
    marginTop:20,
  },
  button:{
    width:"100%",
    height:44,
    backgroundColor:"#8c7acc",
    borderRadius:12,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:20,
    marginTop:20
  },
  textButtom:{
    fontWeight:"bold",
    color:"#0A0416",
    fontSize:16,
  },
  cardContainer:{
    gap:20,
  },
  card:{
    width:"100%",
    height:65 ,
    backgroundColor:"#7154d6",
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20,
  },
  infoCard:{
    flexDirection:"row",
    alignItems:"center",
    gap:10,

  },
  textItem:{
    color:"#0A0416",
    fontSize:16,
  },
  textItem1:{
    color:"#0A0416",
    fontSize:16,
    textDecorationLine:"line-through",
  }
})
