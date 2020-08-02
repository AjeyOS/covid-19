import React from 'react';
import Chart from './components/Charts/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Style from './App.module.css';
import {FetchData} from './api/index';
import Cards from './components/Cards/Card';
import images from './images/image.png';
import {Foot} from './components/Charts/Footer'
class App extends React.Component{

    state = {
        data:{},
        country:'',
    }
    async componentDidMount(){
        const FetchedData =await FetchData();
        this.setState({data:FetchedData});
        
    }

    handleCountryChange = async(country) => {
        const FetchedData =await FetchData(country);
        this.setState({data:FetchedData, country:country});
    }

render(){

    const  {data, country} = this.state;
    return  <div className={Style.container}>
   <img className={Style.image} src={images} alt="COVID-19"/>
   <CountryPicker handleCountryChange={this.handleCountryChange}/>
<Cards data={data}/>

    <Chart data={data} country={country} />
    <Foot />
   
    
    </div>
      
}

}

export default App;
