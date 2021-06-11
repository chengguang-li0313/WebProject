import * as React from 'react';
import styles from './index.module.css';
import {Select,MenuItem,FormControl,InputLabel} from '@material-ui/core';
import { GoogleMap, useJsApiLoader ,Polygon,KmlLayer} from '@react-google-maps/api';
// import {suburbInfo} from '../../../../../public/fakeData'
// import vic from '../../../../../public/geoData/VIC.json'

interface Props {
    t:(params: String) => String;
    onselectedSub:(list:string)=>void
  }
  


function Map(props: Props){
    const {t} = props
    const API_KEY = "AIzaSyCAXT2RoRn919VjG8JvfmA_J68Czrj8Wiw"
    const STATE_LIST = {
    vic:{value:"VIC",id:"vic",data:"/geoData/suburb-2-vic.geojson",loc:{lat: -37.840934,lng: 144.946454}},
    act:{value:"ACT",id:"act",data:"/geoData/suburb-2-act.geojson",loc:{lat: -35.4735,lng: 149.0124}},
    nsw:{value:"NSW",id:"nsw",data:"/geoData/suburb-2-nsw.geojson",loc:{lat: -33.8688,lng: 151.2093}},
     nt:{value:"NT",id:"nt",data:"/geoData/suburb-2-nt.geojson",loc:{lat: -12,lng: 132}},
    qld:{value:"QLD",id:"qld",data:"/geoData/suburb-2-qld.geojson",loc:{lat: -27.4705,lng: 153.0260}},
     sa:{value:"SA",id:"sa",data:"/geoData/suburb-2-sa.geojson",loc:{lat: -34.9285,lng: 138.6007}},
     wa:{value:"WA",id:"wa",data:"/geoData/suburb-2-wa.geojson",loc:{lat: -31.9523,lng: 115.8613}},
    tas:{value:"TAS",id:"tas",data:"/geoData/suburb-2-tas.geojson",loc:{lat: -42.0409,lng: 146.8087}}}

    const [state,setState] =React.useState(0)
    const [currentState,setCurrentState] =React.useState(null)
    const [selectSuburb,setSelectSuburb] = React.useState('')
    const [value,setValue]  = React.useState("vic")
    const [feature,setFeature]  = React.useState([])
    const [currentSuburb,setCurrentSuburb]= React.useState('')
    
    const forceUpdate = ()=>{
        setState(prev=>prev+=1)
    }
    const containerStyle = {
        width: '100%',
        height: '500px'
      };
      
      const [center,setCenter]=React.useState({
        lat: -37.840934,
        lng: 144.946454
      })

    //   const center ={
    //     lat: -37.840934,
    //     lng: 144.94645
    //   }
  
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
      })
     
    
      const [map, setMap] = React.useState(null)
      const options = {
        fillColor: "lightblue",
        fillOpacity: 1,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
      }
      
      const handleChange =(event:any)=>{

        let tempMap = {}
        Object.assign(tempMap,map)
        google.maps.event.clearListeners(map.data, 'click');
        setMap(tempMap)
        setValue(event.target.value)
        setCenter(STATE_LIST[event.target.value].loc)
        feature.map((f)=>{
          map.data.remove(f)
        })
        
      }
      const onLoad = React.useCallback(function callback(map) {
        setMap(map)
        
        // loadGeoJsonString(map)
      }, [])

      React.useEffect(() => {
        if (map) {
          console.log("map updated")
          // map.data.removeListener((event:any) => {})
          forceUpdate()
          loadGeoJsonString()
        }
        if(selectSuburb){
          console.log("selectSuburb",selectSuburb)
        }
        if (value) {
          forceUpdate()
          // loadGeoJsonString()
        }
      }, [map,value])


      const loadGeoJsonString=()=> {
        try {
          console.log('map',map)
          
          // const geojson = JSON.parse("https://raw.githubusercontent.com/siu555/GeoJson-Data/master/suburb-10-vic.geojson");
          map.data.loadGeoJson(
            STATE_LIST[value].data,{},
            (feature)=>{setFeature(feature)}
            //"/geoData/suburb-2-vic.geojson"
          );
          // console.log("mao",map.data)
          map.data.setStyle((feature) => {
            let color = "#8d8d8d";
        
            if (feature.getProperty("isColorful")) {
              color = '#3464DC'//feature.getProperty("color");
            }
            return /** @type {!google.maps.Data.StyleOptions} */ {
              fillColor: color,
              strokeColor: color,
              strokeWeight: 1,
            };
          });
          map.data.addListener("click", (event:any) => {
            console.log('event.feature',event.feature)
            if(event.feature.getProperty('isColorful')){
              event.feature.setProperty("isColorful", false);
            }else{
              event.feature.setProperty("isColorful", true);
            }
            
            setSelectSuburb((prev) => {
              if(event.feature.i.postcode){
                if(prev.includes(event.feature.i.suburb+' '+event.feature.i.postcode+", ")){
                  props.onselectedSub(prev.replace(event.feature.i.suburb+' '+event.feature.i.postcode+" ",''))
                  return prev.replace(event.feature.i.suburb+' '+event.feature.i.postcode+" ",'')
                }else{
                  props.onselectedSub(prev+event.feature.i.suburb+' '+event.feature.i.postcode+", ")
                  return prev+event.feature.i.suburb+' '+event.feature.i.postcode+", "
                }
              }else{
                if(prev.includes(event.feature.i.suburb+", ")){
                  // props.onselectedSub
                  return prev.replace(event.feature.i.suburb+", ",'')
                }else{
                  return prev+event.feature.i.suburb+", "
                }
              }
              
            })//!prev.includes(event.feature.i.suburb)?prev+event.feature.i.suburb+', '+event.feature.i.postcode+"; ":prev.replace(event.feature.i.suburb+', '+event.feature.i.postcode+"; ",''))
            
          });

          map.data.addListener("mouseover", (event:any) => {
            map.data.revertStyle();
            setCurrentSuburb(event.feature.i.suburb)
            
            map.data.overrideStyle(event.feature, { 
              // fillColor: '',
              // strokeColor: '#3464DC',
              strokeWeight: 3, });
          });
          map.data.addListener("mouseout", (event) => {
            map.data.revertStyle();
          });
        
        } catch (e) {
          console.log("Not a GeoJSON file!");
        }
      }
      const onUnmount = React.useCallback(function callback(map) {
        // console.log("aaa")
        setMap(null)
        forceUpdate()
      }, [])
    // console.log("STATE_LIST[value]",STATE_LIST[value])
    return(

      <div className={styles.map_inner_container}>
         <div className={styles.map_option_info_container}>
          <FormControl className={styles.formControl}>
            <InputLabel id="demo-simple-select-label">{t('dashboard.acc.delivery.setDelivery.setState')}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={handleChange}
            >
              {Object.values(STATE_LIST).map(state=>
                (<MenuItem key={state.id} value={state.id}>{state.value}</MenuItem>)
              )}
              
            </Select>
        </FormControl>
        <div className={styles.label_container_sub}>
          <div className={styles.label_title}>{t('dashboard.acc.delivery.setDelivery.label')}</div>
          <div className={styles.label_content}>{currentSuburb}</div>
        </div>
        <div className={styles.label_container}>
          <div className={styles.label_title}>{t('dashboard.acc.delivery.setDelivery.selectedList')}</div>
          <div className={styles.label_content}>{selectSuburb}</div>
        </div>
        </div>
        {isLoaded ?
        
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
        
        </GoogleMap>: <></>
        }
       
      </div>
        
    ) 
}

export default React.memo(Map)