import React, {useState} from 'react';
import { Stack, Text, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';
import logo from './azureml.png';
import './App.css';


import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};

export const App: React.FunctionComponent = () => {

  
  async function onScore1():Promise<string>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer PrmnZkhGzP80x1TEpXreLoEelwHhrX8o");
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Access-Control-Allow-Origin", "*")
    // myHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    // myHeaders.append("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    var raw = JSON.stringify({
      "input_data": {
        "columns": [
          "Pregnancies",
          "PlasmaGlucose",
          "DiastolicBloodPressure",
          "TricepsThickness",
          "SerumInsulin",
          "BMI",
          "DiabetesPedigree",
          "Age"
        ],
        "data": [
          [
            Pregnancies,
            PlasmaGlucose,
            DiastolicBloodPressure,
            TricepsThickness,
            SerumInsulin,
            BMI,
            DiabetesPedigree,
            Age
          ]
        ],
        "index": [
          0
        ]
      }
    });

    var requestOptions:RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      // mode:  'no-cors',
      
    };

    // fetch("/score", requestOptions)
    fetch("https://man-diabetes-mma-managed-001.westeurope.inference.ml.azure.com/score", requestOptions) 
     .then(response => response.text())
      .then(result => {
        console.log(result);
        setPredicted(true)
        if (result === "[0]") {
          setRes("Non-Diabetic")
        } else if (result ==="[1]") {
          setRes("Diabetic")
        } else {
          setRes("Unknown")
        }
        
      })
      .catch(error => console.log('error', error));

      return "xxx"
  }



  const [res, setRes] = useState<string>("N/A");
  const [predicted, setPredicted] = useState<boolean>(false);

  const [Pregnancies, setPregnancies] = useState<string>("2");
  const [PlasmaGlucose, setPlasmaGlucose] = useState<string>("180");
  const [DiastolicBloodPressure, setDiastolicBloodPressure] = useState<string>("74");
  const [TricepsThickness, setTricepsThickness] = useState<string>("24");
  const [SerumInsulin, setSerumInsulin] = useState<string>("21");
  const [BMI, setBMI] = useState<string>("23.9091702");
  const [DiabetesPedigree, setDiabetesPedigree] = useState<string>("1.488172308");
  const [Age, setAge] = useState<string>("60");
  

  return (
    <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
      <img className="App-logo" src={logo} alt="logo" />
      <Text variant="xxLarge" styles={boldStyle}>
        Diabetes Model - Online-endpoint
      </Text>
      
      <Text variant="large">Enter values and click Score button.</Text>
      
      <Stack tokens={stackTokens} horizontalAlign="end">
      <TextField underlined label="Pregnancies" defaultValue={Pregnancies} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setPregnancies(newValue || '')} required={true}/>
      <TextField underlined label="PlasmaGlucose" defaultValue={PlasmaGlucose} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setPlasmaGlucose(newValue || '')} required={true}/>
      <TextField underlined label="DiastolicBloodPressure" defaultValue={DiastolicBloodPressure} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setDiastolicBloodPressure(newValue || '')} required={true}/>
      <TextField underlined label="TricepsThickness" defaultValue={TricepsThickness} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setTricepsThickness(newValue || '')} required={true}/>
      <TextField underlined label="SerumInsulin" defaultValue={SerumInsulin} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setSerumInsulin(newValue || '')} required={true}/>
      <TextField underlined label="BMI" defaultValue={BMI} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setBMI(newValue || '')} required={true}/>
      <TextField underlined label="DiabetesPedigree" defaultValue={DiabetesPedigree} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setDiabetesPedigree(newValue || '')} required={true}/>
      <TextField underlined label="Age" defaultValue={Age}  onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setAge(newValue || '')} required={true}/>
      <PrimaryButton text="Score" onClick={onScore1} allowDisabledFocus />
      </Stack>
      {/* 
      <Stack>
        <Text variant="large"> Pregnancies: {Pregnancies}</Text>
        <Text variant="large"> PlasmaGlucose: {PlasmaGlucose}</Text>
        <Text variant="large"> DiastolicBloodPressure: {DiastolicBloodPressure}</Text>
        <Text variant="large"> TricepsThickness: {TricepsThickness}</Text>
        <Text variant="large"> SerumInsulin: {SerumInsulin}</Text>
        <Text variant="large"> BMI: {BMI}</Text>
        <Text variant="large"> DiabetesPedigree: {DiabetesPedigree}</Text>
        <Text variant="large"> Age: {Age}</Text>
      </Stack> 
      */}
      {predicted?<Stack><Text variant="large"> Prediction: <strong>{res}</strong></Text></Stack>:null}
      
    </Stack>
  );
};
