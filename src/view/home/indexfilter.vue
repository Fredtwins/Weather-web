<template>
    <van-popup v-model="currentValue" position="bottom">
        <van-area :area-list="areaList" @cancel='cancel' @confirm='confirm' :columns-num="3" :title="title" />
    </van-popup>
</template>

<script>
import Vue from 'vue'
import { Area, Popup } from 'vant';

Vue.use(Area).use(Popup);

export default {
    props: {
        filterAearData: {
            type: Array,
            default() {
                return {}
            }
        },
        title: {
            default: '选择'
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            areaList: {},
            currentValue: false,
            vessel: {},
            latsel: {},
            lngsel: {}
        }
    },
    watch: {
        filterAearData(arr) {
            this.filterAearDataTurnAreaList(arr)
        },
        currentValue(val) {
            this.$emit('input', val);
        },
        value(val) {
            this.currentValue = val;
        }
    },
    methods: {
        removeDup(oldArr, key) {
            let allArr = [];
            for(let i = 0; i < oldArr.length; i++){
            　　let flag = true;
            　　for(let j = 0; j < allArr.length; j++){
            　　　　if(oldArr[i][key] == allArr[j][key]){
            　　　　　　flag = false;
            　　　　};
            　　}; 
            　　if(flag){
            　　　　allArr.push(oldArr[i]);
            　　};
            };
            return allArr
        },
        filterAearDataTurnAreaList(arr) {
            let tempProvincelistArr = [];
            let tempCitylistArr = [];
            let tempCountylistArr = [];
            let provincelistNum = 10
            let citylistNum = 10
            let countylistNum = 10
            let province_list = {}
            let city_list = {}
            let county_list = {}
            let tempName2 = ''
            let tempName3 = ''
            arr.forEach(element => {
                tempProvincelistArr.push(element.dist)
                tempCitylistArr.push({
                    parentName: element.dist,
                    nodeName: element.town
                });
                tempCountylistArr.push({
                    parentName: element.town,
                    nodeName: element.sn,
                    id: element.id,
                    latitude: element.latitude,
                    longitude: element.longitude
                })
            });
            tempProvincelistArr = Array.from(new Set(tempProvincelistArr))
            tempCitylistArr = this.removeDup(tempCitylistArr, 'nodeName')
            tempCountylistArr = this.removeDup(tempCountylistArr, 'nodeName')
            tempProvincelistArr.forEach(element => {
                provincelistNum += 1;
                province_list[provincelistNum] = element
            })
            tempCitylistArr.forEach(element => {
                if(element.parentName != tempName2) {
                    citylistNum = 10;
                    tempName2 = element.parentName
                }
                for (const key in province_list) {
                    if (province_list.hasOwnProperty(key)) {
                        if(province_list[key] == element.parentName) {
                            citylistNum += 1;
                            city_list[key + citylistNum] = element.nodeName
                        }
                    }
                }
            })
            this.vessel = {}
            this.latsel = {}
            this.lngsel = {}
            tempCountylistArr.forEach(element => {
                if(element.parentName != tempName3) {
                    countylistNum = 10;
                    tempName3 = element.parentName
                }
                for (const key in city_list) {
                    if (city_list.hasOwnProperty(key)) {
                        if(city_list[key] == element.parentName) {
                            countylistNum += 1
                            this.vessel[key + countylistNum] = element.id
                            this.latsel[key + countylistNum] = element.latitude
                            this.lngsel[key + countylistNum] = element.longitude
                            county_list[key + countylistNum] = element.nodeName
                        }
                    }
                }
            })
            this.areaList = {
                province_list: province_list,
                city_list: city_list,
                county_list: county_list
            }
        },
        confirm(val) {
          let id = this.vessel[val[val.length - 1].code] || '';
          let latitude = this.latsel[val[val.length - 1].code] || '';
          let longitude = this.lngsel[val[val.length - 1].code] || '';
          this.currentValue = false;
          this.$emit('confirm', {result: val, id, latitude, longitude})
        },
        cancel() {
            this.currentValue = false;
            this.$emit('cancel')
        }
    }
}
</script>

<style>

</style>
