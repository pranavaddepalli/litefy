/// <reference path="../../../../node_modules/@types/spotify-api/index.d.ts" />

import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/models/user';
import { SpotifyUserService } from 'src/app/services/spotify-user.service';
import { UserService } from 'src/app/services/user.service';
import { SpotifyPlaylistService } from 'src/app/services/spotify-playlist.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor(private serviceUsuario: SpotifyUserService, private usuario: UserService, private playlistService: SpotifyPlaylistService) { }

  userPlaylists: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>;
  userAlbums: SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject>;
  userTracks: SpotifyApi.PagingObject<SpotifyApi.SavedTrackObject>;

  usuarioLogado: User;

  ngOnInit() {
    this.getLoggedUser();
    this.getUserLibrary();
  }

  getLoggedUser() {
    this.usuario.getUser()
      .subscribe(item => {
        this.usuarioLogado = item;
      });
  }

  getUserLibrary() {
    const requests = [];

    requests.push(this.serviceUsuario.getUserPlaylists(), this.serviceUsuario.getUserAlbums(), this.serviceUsuario.getUserTracks());

    forkJoin(requests)
      .subscribe((items: any[]) => {
        this.userPlaylists = items[0].items;
        this.userAlbums = items[1].items;
        this.userTracks = items[2].items;
      });
  }

  createPlaylist() {
    console.log("create");
    console.log(this.playlistService.createPlaylist("tester", "new playlist", true))
  }

  addTrack() {
    console.log("add");
    console.log(this.playlistService.addTrack("4gZayV5XRm76t3cKy6RM7a", "spotify:track:4SI5jkfBClYmMWhWWH8f9p"))

  }

  deleteTrack() {
    console.log("delete");


  }

}
