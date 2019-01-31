/**
 * Created by superman on 2016/12/2.
 */
import axios from 'axios';

// 使用代理
// const HOST =process.env.NODE_ENV === 'production' ? 'https://node-douban-api.herokuapp.com' : 'http://localhost:4000';

export const API_TYPE = {
  movie: {
    in_theaters: 'in_theaters',
    coming_soon: 'coming_soon',
  }
};

export function fetch(api, params) {

  return new Promise((resolve, reject)=> {
    axios.get(api, {params: params})
        .then(response => {
          resolve(response.data);
        })
  //   axios({
  //     method: 'get',
  //     url: api,
  //     data: params
  //   }).then(response => {
  //         resolve(response.data);
  //       })
  })
}

export function fetchItemByType(type) {
  return fetch(`${type}`);
}


export function fetchMoviesByType(type, start = 0, count = 20) {
  return fetchItemByType(`/movie/${type}?start=${start}&count=${count}`)
}

export function fetchMovieById(id) {
  return fetch(`/movie/subject/${id}`);
}

export function fetchSearchMovies(query, start = 0) {
  let url = encodeURI(`/movie/search?q=${query}&start=${start}`);
  return fetch(url);
}


export function fetchMoviesByParams(params){
  let url = '/api/spider/videos/'
  return fetch(url, params)
}


export function fetchMoviesDetail(mid){
  let url = encodeURI(`/api/spider/videos/${mid}/`);
  return fetch(url)
}

export function fetchMoviesChapters(mid){
  let url = encodeURI(`/api/spider/videos/${mid}/chapters/`);
  return fetch(url)
}

export function fetchMoviesChaptersDetail(mid, cid){
  let url = encodeURI(`/api/spider/videos/${mid}/chapters/${cid}/`);
  return fetch(url)
}
