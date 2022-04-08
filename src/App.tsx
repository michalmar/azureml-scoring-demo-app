import React, {useState} from 'react';
import { Stack, Text, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';
import logo from './azureml.png';
import './App.css';


import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton, CompoundButton } from '@fluentui/react/lib/Button';

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
 

  async function onScore():Promise<string>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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

    fetch("/score", requestOptions)
     .then(response => response.text())
      .then(result => {
        console.log(result);
        setPredicted(true)
        if (result === "0") {
          setRes("Non-Diabetic")
        } else if (result ==="1") {
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
  const [scenario, setScenario]= useState<string>("2");

  const [Pregnancies, setPregnancies] = useState<string>("2");
  const [PlasmaGlucose, setPlasmaGlucose] = useState<string>("180");
  const [DiastolicBloodPressure, setDiastolicBloodPressure] = useState<string>("74");
  const [TricepsThickness, setTricepsThickness] = useState<string>("24");
  const [SerumInsulin, setSerumInsulin] = useState<string>("21");
  const [BMI, setBMI] = useState<string>("23.9091702");
  const [DiabetesPedigree, setDiabetesPedigree] = useState<string>("1.488172308");
  const [Age, setAge] = useState<string>("60");

  // non-diabetic
  function usecase1():void{
    setScenario("1")
    setPregnancies("0");
    setPlasmaGlucose("148");
    setDiastolicBloodPressure("58");
    setTricepsThickness("11");
    setSerumInsulin("179");
    setBMI("39.19207553");
    setDiabetesPedigree("0.160829008");
    setAge("45");
  }
  // diabetic
  function usecase2():void{
    setScenario("2")
    setPregnancies("2");
    setPlasmaGlucose("180");
    setDiastolicBloodPressure("74");
    setTricepsThickness("24");
    setSerumInsulin("21");
    setBMI("23.9091702");
    setDiabetesPedigree("1.488172308");
    setAge("60");
  }
  

  return (
    <Stack horizontalAlign="center" verticalAlign="start" verticalFill styles={stackStyles} tokens={stackTokens}>
      <img className="App-logo" src={logo} alt="logo" />
      <Text variant="xxLarge" styles={boldStyle}>
        Diabetes Model - Online-endpoint
      </Text>
      
      <Text variant="large">Enter values or choose pre-filled scenario and click Score button.</Text>
      <Stack horizontal tokens={stackTokens} >
        <CompoundButton secondaryText="non-diabetic patient" checked={scenario==="1"?true:false} onClick={usecase1}>Scenario 1</CompoundButton>
        <CompoundButton secondaryText="diabetic patient"     checked={scenario==="2"?true:false} onClick={usecase2}>Scenario 2</CompoundButton>
      </Stack>
      <Stack tokens={stackTokens} horizontalAlign="end">
        <TextField underlined label="Pregnancies" value={Pregnancies} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setPregnancies(newValue || '')} required={true}/>
        <TextField underlined label="PlasmaGlucose" value={PlasmaGlucose} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setPlasmaGlucose(newValue || '')} required={true}/>
        <TextField underlined label="DiastolicBloodPressure" value={DiastolicBloodPressure} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setDiastolicBloodPressure(newValue || '')} required={true}/>
        <TextField underlined label="TricepsThickness" value={TricepsThickness} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setTricepsThickness(newValue || '')} required={true}/>
        <TextField underlined label="SerumInsulin" value={SerumInsulin} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setSerumInsulin(newValue || '')} required={true}/>
        <TextField underlined label="BMI" value={BMI} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setBMI(newValue || '')} required={true}/>
        <TextField underlined label="DiabetesPedigree" value={DiabetesPedigree} onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setDiabetesPedigree(newValue || '')} required={true}/>
        <TextField underlined label="Age" value={Age}  onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setAge(newValue || '')} required={true}/>
        <PrimaryButton text="Score" onClick={onScore} allowDisabledFocus />
      </Stack>

      {predicted?<Stack><Text variant="large"> Prediction: <strong>{res}</strong></Text></Stack>:null}
      
    </Stack>
  );
};
