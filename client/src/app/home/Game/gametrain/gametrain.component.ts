import { Component, OnInit, AfterViewInit,DoCheck, EventEmitter, Input, HostListener, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { User } from '../../../_models/index';
import { UserService } from '../../../_services/index';
import { RosService } from '../../../_services/index';
import { HideService } from '../../../_services/index';
import { appConfig } from '../../../app.config';


@Component({
  selector: 'app-gametrain',
  templateUrl: './gametrain.component.html',
  styleUrls: ['./gametrain.component.css']
})
export class GametrainComponent implements AfterViewInit  {
    ros: any;
    currentUser: User;
    users: User[];

    @ViewChild('gamecanvas') gamecanvas: ElementRef;
    public ctx: CanvasRenderingContext2D;

    @ViewChild('confirmationButton') confirmButton: ElementRef;
    buttonstatus:boolean;
         gameMap:any;
         start:any;
         maps: {gameMap, start}[];
         tileW:number ; 
         tileH:number;
         mapW:number; mapH:number;
         currentSecond:number; frameCount:number; framesLastSecond:number;
         lastFrameTime:number;

         tileset:any; tilesetURL:string; tilesetLoaded:boolean;

         floorTypes:{solid: number,
            path: number,
            room: number,
            box: number,
            hidden: number};
         keysDown:{};

         tileTypes:{};

        directions:{
            up: number,
            right: number,
            down: number,
            left: number
        };

        tileFrom:[number, number];
        tileTo:[number,number];
        timeMoved:number;
        dimensions:[number, number];
        position:[number, number];
        delayMove:number;
        direction:number;

        sprites:{};

        target:any;
        moving:any;
        plan:any;    
        lastMove:any;
        lastClick:any;
        stack:any;

        rooms:{};
        player:any;

        mapId:any;

        tileis:number; 

        constructor(private userService: UserService, private rosService:RosService, public hideservice: HideService, public modal: Modal){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      this.maps = [{
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 1, 2, 0,
                0, 4, 4, 4, 4, 1, 1, 0,
                0, 1, 2, 1, 4, 1, 1, 0,
                0, 1, 1, 1, 4, 1, 1, 0,
                0, 1, 1, 1, 1, 3, 3, 0,
                0, 1, 2, 0, 0, 2, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 45]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 4, 1, 1, 1, 0,
                0, 1, 1, 4, 2, 1, 1, 0,
                0, 0, 1, 4, 4, 1, 1, 0,
                0, 1, 1, 1, 1, 1, 2, 0,
                0, 1, 0, 1, 2, 4, 1, 0,
                0, 2, 1, 3, 3, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 45]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 1, 1, 0,
                0, 1, 1, 1, 4, 1, 1, 0,
                0, 0, 3, 0, 1, 4, 4, 0,
                0, 1, 2, 1, 1, 1, 2, 0,
                0, 4, 4, 4, 4, 1, 1, 0,
                0, 2, 1, 1, 3, 1, 2, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [245, 45]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 4, 2, 4, 1, 0,
                0, 2, 1, 4, 1, 4, 1, 0,
                0, 1, 1, 4, 1, 1, 1, 0,
                0, 0, 3, 4, 0, 1, 2, 0,
                0, 1, 1, 1, 3, 1, 1, 0,
                0, 1, 2, 1, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [245, 45]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 2, 1, 1, 1, 0,
                0, 2, 1, 3, 0, 1, 2, 0,
                0, 1, 4, 4, 4, 1, 1, 0,
                0, 1, 4, 1, 0, 0, 1, 0,
                0, 1, 4, 2, 4, 1, 1, 0,
                0, 1, 1, 1, 4, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [245, 245]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 2, 1, 3, 1, 0,
                0, 1, 1, 1, 1, 0, 1, 0,
                0, 2, 4, 1, 3, 0, 3, 0,
                0, 1, 1, 1, 1, 4, 1, 0,
                0, 3, 1, 4, 4, 4, 1, 0,
                0, 0, 2, 1, 2, 4, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [245, 245]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 4, 2, 1, 2, 1, 0,
                0, 1, 4, 4, 4, 1, 1, 0,
                0, 1, 1, 1, 3, 4, 2, 0,
                0, 1, 0, 1, 1, 0, 1, 0,
                0, 1, 3, 1, 3, 1, 1, 0,
                0, 1, 1, 1, 3, 2, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 45]
        }, {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 1, 1, 0,
                0, 4, 4, 4, 1, 1, 2, 0,
                0, 1, 2, 1, 1, 1, 1, 0,
                0, 0, 1, 4, 0, 3, 4, 0,
                0, 1, 3, 1, 1, 1, 1, 0,
                0, 2, 3, 1, 1, 2, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 45]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1, 1, 1, 2, 0,
                0, 2, 3, 1, 4, 1, 1, 0,
                0, 1, 3, 1, 4, 1, 0, 0,
                0, 1, 4, 1, 4, 1, 0, 0,
                0, 1, 1, 1, 4, 2, 1, 0,
                0, 1, 4, 2, 4, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 245]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 2, 1, 1, 1, 3, 1, 0,
                0, 4, 4, 4, 1, 1, 2, 0,
                0, 0, 3, 1, 1, 4, 4, 0,
                0, 2, 1, 1, 1, 1, 1, 0,
                0, 4, 4, 1, 4, 3, 0, 0,
                0, 1, 1, 1, 1, 1, 2, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 245]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 0, 2, 1, 1, 1, 0,
                0, 0, 3, 3, 4, 1, 1, 0,
                0, 2, 1, 1, 4, 1, 4, 0,
                0, 1, 1, 1, 1, 1, 2, 0,
                0, 1, 4, 4, 4, 1, 1, 0,
                0, 1, 2, 0, 4, 0, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [245, 45]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 2, 1, 2, 4, 1, 1, 0,
                0, 1, 4, 4, 4, 1, 1, 0,
                0, 1, 1, 1, 3, 1, 1, 0,
                0, 4, 4, 1, 1, 1, 1, 0,
                0, 2, 1, 1, 1, 0, 0, 0,
                0, 1, 0, 2, 1, 0, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [245, 45]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 2, 3, 1, 1, 0,
                0, 0, 1, 1, 1, 4, 4, 0,
                0, 0, 1, 4, 1, 1, 3, 0,
                0, 1, 2, 4, 1, 1, 2, 0,
                0, 4, 4, 4, 1, 0, 1, 0,
                0, 1, 1, 3, 2, 0, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 245]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 1, 2, 0,
                0, 2, 3, 1, 1, 1, 1, 0,
                0, 3, 4, 1, 3, 4, 1, 0,
                0, 0, 1, 1, 2, 4, 1, 0,
                0, 0, 1, 4, 4, 4, 1, 0,
                0, 1, 1, 4, 2, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 245]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 4, 2, 4, 1, 2, 0,
                0, 1, 4, 1, 4, 1, 1, 0,
                0, 1, 1, 1, 3, 1, 1, 0,
                0, 1, 4, 1, 0, 1, 1, 0,
                0, 1, 4, 1, 4, 1, 1, 0,
                0, 2, 3, 1, 0, 2, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 45]
        },
        {
            gameMap: [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 1, 2, 0,
                0, 4, 1, 4, 3, 1, 1, 0,
                0, 0, 4, 0, 4, 1, 4, 0,
                0, 1, 2, 1, 1, 1, 0, 0,
                0, 1, 1, 1, 1, 1, 2, 0,
                0, 0, 3, 2, 1, 3, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0
            ], start: [45, 45]
        }];
         this.tileW = 40; this.tileH = 40;
         this.mapW = 8; this.mapH = 8;
        this.currentSecond = 0; this.frameCount = 0; this.framesLastSecond = 0;
         this.lastFrameTime = 0;

         this.tileset = null; this.tilesetURL = "../../../assets/game/tileset.png"; this.tilesetLoaded = false;

        this.floorTypes = {
            solid: 0,
            path: 1,
            room: 2,
            box: 3,
            hidden: 4
        };
        this.keysDown = {
            37: false,
            38: false,
            39: false,
            40: false
        };

        this.tileTypes = {
            0: { colour: "#685b48", floor: this.floorTypes.solid, sprite: [{ x: 0, y: 0, w: 40, h: 40 }] },
            1: { colour: "#5aa457", floor: this.floorTypes.path, sprite: [{ x: 80, y: 0, w: 40, h: 40 }] },
            2: { colour: "#e8bd7a", floor: this.floorTypes.path, sprite: [{ x: 120, y: 0, w: 40, h: 40 }] },
            3: { colour: "#286625", floor: this.floorTypes.path, sprite: [{ x: 160, y: 0, w: 40, h: 40 }] },
            4: { colour: "#685b48", floor: this.floorTypes.solid, sprite: [{ x: 80, y: 0, w: 40, h: 40 }] }
        };

        this.directions = {
            up: 0,
            right: 1,
            down: 2,
            left: 3
        };

        this.tileFrom = [1, 1];
        this.tileTo = [1, 1];
        this.timeMoved = 0;
        this.dimensions = [30, 30];
        this.position = [45, 45];
        this.delayMove = 700;
        this.direction = this.directions.up;

        this.sprites = {};

        this.target = null;
        this.moving = false;
        this.plan = [];    
        this.lastMove = null;
        this.lastClick = [];
        this.stack = [];

        this.rooms = {};
        // console.log("**********calling charatcter************************");
          
         this.tileis = 20;

      console.log("************constructor********************");
      
  };

        Character(self) {
            console.log("ss "+self.tileW)
            this.tileFrom = [1, 1];
            this.tileTo = [1, 1];
            this.tileis = 30;
            this.timeMoved = 0;
            this.dimensions = [30, 30];
            this.position = [45, 45];
            this.delayMove = 700;
            console.log(self.directions.up + "*********up");
            this.direction = self.directions.up;
            // this.sprites={, []};

            this.sprites= {};
            this.sprites[self.directions.up] = [{ x: 0, y: 120, w: 30, h: 30 }];
            this.sprites[self.directions.right] = [{ x: 0, y: 150, w: 30, h: 30 }];
            this.sprites[self.directions.down] = [{ x: 0, y: 180, w: 30, h: 30 }];
            this.sprites[self.directions.left] = [{ x: 0, y: 210, w: 30, h: 30 }];

            this.target = null;
            this.moving = false;
            this.plan = [];
            this.lastMove = null;
            this.lastClick = [];
            this.stack = [];
        };


        ngAfterViewInit() {
          console.log("******************ngoniti*************************" + this.tileW);
          this.ctx = (<HTMLCanvasElement>this.gamecanvas.nativeElement).getContext('2d');
          var self = this;
          this.player = new this.Character(self);
            this.gameMap = this.setMap(Math.floor(Math.random() * this.maps.length));
            console.log("where");
            requestAnimationFrame(()=>this.drawGame());
            this.ctx.font = "bold 10pt sans-serif";

            this.tileset = new Image();

            this.tileset.onerror =()=> {
                this.ctx = null;
                alert("Failed loading tileset.");
            };

            this.tileset.onload = () => { this.tilesetLoaded = true; };

            this.tileset.src = this.tilesetURL;
      
        };

        

        setMap(id) {
            const map = this.maps[id];
            this.mapId = id;
            this.player.position = [...map.start];
            this.player.tileFrom = map.start.map(px => Math.floor(px / 40.0));
            this.player.tileTo = map.start.map(px => Math.floor(px / 40.0));
            map.gameMap.map((tile, i) => [tile, { x: i % 8, y: Math.floor(i / 8) }]).filter(tile => tile[0] == 2).forEach((tile, i) => this.rooms[tile[1].x + tile[1].y * 6 - 6] = i + 1);
            return map.gameMap;
        };

        
        drawGame() {
            // console.log("inside drawGame**" + this.tileis + " "+ this.player.tileis );
            if (this.ctx == null) { return; }
            if (!this.tilesetLoaded) { requestAnimationFrame(()=>this.drawGame()); return; }

            var currentFrameTime = Date.now();
            var timeElapsed = currentFrameTime - this.lastFrameTime;

            var sec = Math.floor(Date.now() / 1000);
            if (sec != this.currentSecond) {
                this.currentSecond = sec;
                this.framesLastSecond = this.frameCount;
                this.frameCount = 1;
            }
            else { this.frameCount++; }

            // console.log("before calling ");
            this.player.moving = this.processMovement(this.player,currentFrameTime);
            if (!this.player.moving) {
                console.log("asd");
                if (this.player.lastMove) {
                    this.confirmLastMove(this.player);
                } else if (this.player.target) {
                    this.moveToLocation(this.player);
                }
            }

            this.ctx.fillStyle = "#000000";

            for (var y = 0; y < this.mapH; ++y) {
                for (var x = 0; x < this.mapW; ++x) {
                    var tile = this.tileTypes[this.gameMap[this.toIndex(x, y)]];
                    this.ctx.drawImage(this.tileset,
                        tile.sprite[0].x, tile.sprite[0].y,
                        tile.sprite[0].w, tile.sprite[0].h,
                        (x * this.tileW),
                        (y * this.tileH),
                        this.tileW, this.tileH);
                }
            }

            var sprite = this.player.sprites[this.player.direction];
            this.ctx.drawImage(this.tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
                this.player.position[0],
                this.player.position[1],
                this.player.dimensions[0], this.player.dimensions[1]);

            // ctx.fillStyle = "#ff0000";
            // ctx.fillText("FPS: " + framesLastSecond, 10, 20);

            this.lastFrameTime = currentFrameTime;
            requestAnimationFrame(()=>this.drawGame());
           };
  

  toIndex(x, y) {
            return ((y * this.mapW) + x);
        };
 

 gameClick(event){
                 console.log("this.gamecanvas.nativeElement.getBoundingClientRect().left " + this.gamecanvas.nativeElement.getBoundingClientRect().left);
                let clicked = {
                    x: Math.floor((event.clientX - this.gamecanvas.nativeElement.getBoundingClientRect().left) / 40.0),
                    y: Math.floor((event.clientY - this.gamecanvas.nativeElement.getBoundingClientRect().top) / 40.0)
                };
                if (this.gameMap[clicked.x + clicked.y * 8] != 2) return;
                if (this.player.target) {
                    this.player.lastClick = { x: clicked.x, y: clicked.y };
                } else {
                    this.player.plan.push({ Action: `Human-Clicked (event.x,event.y)`, explain: true });
                }
                this.player.target = Object.assign({}, clicked);
                let search = this.BFS(this.player.target.x + this.player.target.y * 8, Math.floor(this.player.position[0] / 40.0) + Math.floor(this.player.position[1] / 40.0) * 8);
                const path = [];
                while (!!search && search.parent != null) {
                    path.push(search.move);
                    search = search.parent;
                }
                this.player.stack = path;
            };

        
        placeAt(player, x, y) {
            player.tileFrom = [x, y];
            player.tileTo = [x, y];
            player.position = [((this.tileW * x) + ((this.tileW - player.dimensions[0]) / 2)),
            ((this.tileH * y) + ((this.tileH - player.dimensions[1]) / 2))];
        };

        processMovement(player,t){
            // console.log("YEAAHHH*******************8" + this.tileis + " "+ player.tileis);
            if (player.tileFrom[0] == player.tileTo[0] &&
                player.tileFrom[1] == player.tileTo[1]) { return false; }


            if ((t - player.timeMoved) >= player.delayMove) {
                this.placeAt(player, player.tileTo[0], player.tileTo[1]);
            }

            else {
                player.position[0] = (player.tileFrom[0] * this.tileW) + ((this.tileW - player.dimensions[0]) / 2);
                player.position[1] = (player.tileFrom[1] * this.tileH) + ((this.tileH - player.dimensions[1]) / 2);

                if (player.tileTo[0] != player.tileFrom[0]) {
                    var diff = (this.tileW / player.delayMove) * (t - player.timeMoved);
                    player.position[0] += (player.tileTo[0] < player.tileFrom[0] ? 0 - diff : diff);
                }

                if (player.tileTo[1] != player.tileFrom[1]) {
                    var diff = (this.tileH / player.delayMove) * (t - player.timeMoved);
                    player.position[1] += (player.tileTo[1] < player.tileFrom[1] ? 0 - diff : diff);
                }

                player.position[0] = Math.round(player.position[0]);
                player.position[1] = Math.round(player.position[1]);
            }

            return true;
        };

        canMoveTo(x, y) {
            if (x < 0 || x >= this.mapW || y < 0 || y >= this.mapH) { return false; }
            if (this.tileTypes[this.gameMap[this.toIndex(x, y)]].floor != this.floorTypes.path) { return false; }
            return true;
        };

        moveEligible(x, y) {
            return this.getTileType(x, y) == 2;
        };

        resetTarget(player) {
            player.target = null;
            player.lastMove = null;
        };

        canMoveUp(player) { return player.canMoveTo(player.tileFrom[0], player.tileFrom[1] - 1); };
        canMoveDown(player) { return player.canMoveTo(player.tileFrom[0], player.tileFrom[1] + 1); };
        canMoveLeft(player) { return player.canMoveTo(player.tileFrom[0] - 1, player.tileFrom[1]); };
        canMoveRight(player) { return player.canMoveTo(player.tileFrom[0] + 1, player.tileFrom[1]); };

        moveLeft(player,t) { player.tileTo[0] -= 1; player.timeMoved = t; player.direction = this.directions.left; player.lastMove = 'left'; };
        moveRight(player,t) { player.tileTo[0] += 1; player.timeMoved = t; player.direction = this.directions.right; player.lastMove = 'right'; };
        moveUp(player, t) { player.tileTo[1] -= 1; player.timeMoved = t; player.direction = this.directions.up; player.lastMove = 'up'; };
        moveDown(player,t) { player.tileTo[1] += 1; player.timeMoved = t; player.direction = this.directions.down; player.lastMove = 'down'; };
        execMove(player,x, y, direction) {
            switch (direction) {
                case "up":
                    return this.moveUp(player, Date.now());
                case "down":
                    return this.moveDown(player, Date.now());
                case "right":
                    return this.moveRight(player, Date.now());
                case "left":
                    return this.moveLeft(player, Date.now());
            }
        };

        isAllVisited() {
            return !this.gameMap.filter(tile => tile == 2).length;
        };

        moveToLocation(player) {
            if (!!player.target && this.moveEligible(player.target.x, player.target.y)) {
                var playerX = Math.floor(player.position[0] / 40.0);
                var playerY = Math.floor(player.position[1] / 40.0);
                if (this.getTileType(playerX, playerY) == 2 && playerX == player.target.x && playerY == player.target.y) {
                    this.gameMap[playerX + playerY * 8] = 1;
                    player.plan.push({ Action: `Room-visited`, explain: true });
                    if (this.isAllVisited()) {
                        console.log("********************commented out******************************************");
                        // $.post("/game", { path: player.convertPlan(), mapId: this.mapId }, data => {
                        //     sessionStorage.setItem('explainabilityUUID', data);
                        //     window.location.href = '/questions';
                        // });
                    }
                    return this.resetTarget(player);
                }
                if (this.getTileType(playerX, playerY) == 3) {
                    this.gameMap[playerX + playerY * 8] = 1;
                }
                const move = player.stack.pop();
                if (move) {
                    this.execMove(player, playerX, playerY, move);
                }
                else {
                    this.resetTarget(player);
                }
            } else {
                this.resetTarget(player);
            }
        };

        confirmLastMove(player) {
            if (player.lastMove) {
                this.buttonstatus= false;
                // const conf = confirmAction(this.lastMove.charAt(0).toUpperCase() + this.lastMove.slice(1));
                // this.plan.push({ Action: this.lastMove, explain: conf });
                // if (!conf && confirm('1. Do you want to CHANGE the robot\'s target?')) {
                //     this.resetTarget();
                // }
            }
        };

        getPlanSize() {
            return this.plan.length;
        };

        

        getTileType(x, y){
            return this.gameMap[x + y * 8];
        };

        confirmAction(action) {
            return confirm(`2. Do you think the robot is doing the RIGHT thing?`);
        };

        

        BFS(target, v) {
            const s = [];
            const seen = new Set();
            s.push({ index: v, move: null, parent: null });
            while (s.length) {
                v = s.pop();
                seen.add(v.index);
                if (v.index == target) {
                    return v;
                }
                this.adjacentEdges(v.index).forEach(e => seen.has(e.index) ? null : s.unshift({ index: e.index, move: e.move, parent: v }));
            }
        };

        adjacentEdges(v) {
            const tiles = [];
            if (v - 1 >= 0 && this.tileTypes[this.gameMap[v - 1]].floor == this.floorTypes.path) tiles.push({ index: v - 1, move: 'left' });
            if (v % 8 < (v + 1) % 8 && this.tileTypes[this.gameMap[v + 1]].floor == this.floorTypes.path) tiles.push({ index: v + 1, move: 'right' });
            if (v - 8 >= 0 && this.tileTypes[this.gameMap[v - 8]].floor == this.floorTypes.path) tiles.push({ index: v - 8, move: 'up' });
            if (v + 8 < 100 && this.tileTypes[this.gameMap[v + 8]].floor == this.floorTypes.path) tiles.push({ index: v + 8, move: 'down' });
            return tiles;
        };

        

        convertPlan(player) {
            let currLoc = (m => m[0] + m[1] * 6 - 6)(this.maps[this.mapId].start.map(px => Math.floor(px / 40.0)));
            let numObj = 0;
            let lastRoom = 'dummy-room';
            return player.plan.map(p => {
                switch (p.Action) {
                    case 'left':
                        return { Action: p.obstacle ? `remove-obstacle rover1 obstacle${++numObj} loc${currLoc} loc${--currLoc}` : `move rover1 loc${currLoc} loc${--currLoc}`, explain: p.explain };
                    case 'right':
                        return { Action: p.obstacle ? `remove-obstacle rover1 obstacle${++numObj} loc${currLoc} loc${++currLoc}` : `move rover1 loc${currLoc} loc${++currLoc}`, explain: p.explain };
                    case 'up':
                        return { Action: p.obstacle ? `remove-obstacle rover1 obstacle${++numObj} loc${currLoc} loc${currLoc -= 6}` : `move rover1 loc${currLoc} loc${currLoc -= 6}`, explain: p.explain };
                    case 'down':
                        return { Action: p.obstacle ? `remove-obstacle rover1 obstacle${++numObj} loc${currLoc} loc${currLoc += 6}` : `move rover1 loc${currLoc} loc${currLoc += 6}`, explain: p.explain };
                    case 'Room-visited':
                        lastRoom = this.rooms[currLoc];
                        return { Action: `visit-room rover1 room${lastRoom} loc${currLoc}`, explain: p.explain };
                    default:
                        let loc = (l => parseInt(l[0]) + parseInt(l[1]) * 6 - 6)(p.Action.split(/[()]/)[1].split(','));
                        return { Action: `set-to-visit room${this.rooms[loc]} ${lastRoom == 'dummy-room' ? lastRoom : `room${lastRoom}`}`, explain: p.explain };
                }
            });
        };

        confirmFunction(event) {
            this.player.plan.push({ Action: this.player.lastMove, explain: event.id == 'true', obstacle: this.gameMap[this.player.tileTo[0] + this.player.tileTo[1] * 8] == 3 });
            this.player.lastMove = null;
            if (this.player.lastClick) {
                this.player.plan.push({ Action: `Human-Clicked (${this.player.lastClick.x},${this.player.lastClick.y})`, explain: true });
                this.player.lastClick = null;
            }
            // event.attr('disabled', 'disabled');
        };


}
