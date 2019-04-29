import Immutable from "immutable";
import {seriesData} from "./data.mjs";
import Monet from "monet";
const Maybe = Monet.Maybe


const includeProps = ['id','title','year'];
const testDataList = Immutable.List(seriesData);

const overview = testDataList.map(function(r){
    const o = {};
    Object.keys(r).filter(function(a){
        return includeProps.indexOf(a) > -1;
    }).forEach(function(a){
        o[a] = r[a]
    });
    return o
});

const sortedOverview  = overview.sort((r1, r2) => r2.year - r1.year);

export default {

    all(sortByDate, titlePattern, f) {
        const data =  sortByDate === true ?  sortedOverview : overview;
        const filteredData = data.filter(r => (titlePattern===undefined || titlePattern==="") || (r.title.toLowerCase().indexOf(titlePattern.toLowerCase()) > -1))
        f(undefined,filteredData);
    },

    findById(id) {
        return  Maybe.fromUndefined(testDataList.find(s=>s.id === Number(id)))
    },





};

