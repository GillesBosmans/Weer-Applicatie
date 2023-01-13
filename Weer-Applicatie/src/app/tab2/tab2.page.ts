import {Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ApiService} from '../services/api.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  searchLocation = '';
  public res: any;

  constructor(private WeerApi: ApiService, private geolocation: Geolocation) {
  }

  convertTime(time: any) {
    //convert unix date to local-time
    const date = new Date(time * 1000);
    const datum = date.toLocaleString()
    return datum;
  }

  async GetDataFromsearchLocation(event: any): Promise<void> {
    if(event.detail.value !== ''){
      this.getWeerDataBySearchLocation(event.detail.value)
    }
    else{this.getCurrentWeerData();}
  }

  ngOnInit() {
    this.getCurrentWeerData();
  }


  getWeerDataBySearchLocation(searchforlocation: string) {
    this.WeerApi.getWeerDataBySearchLocation(searchforlocation).subscribe((response) => {
      this.res = response;
      console.log(response)
    })
  }

  getCurrentWeerData() {
    let latitude: number;
    let longitude: number;
    //locatie opvragen (latitude, longitude) vie geolocation
    this.geolocation.getCurrentPosition().then((position) => {
      latitude = position.coords.latitude
      longitude = position.coords.longitude
      //locaal weer opvragen door middel van de latitude en longitude
      this.WeerApi.getWeerDataByLatLong(latitude, longitude).subscribe((response) => {
        this.res = response;
        console.log(response)
      });
    });
  }

}
