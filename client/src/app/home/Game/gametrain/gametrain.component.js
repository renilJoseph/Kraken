
<script type="text/javascript">
        // Author: Mehrdad Zakershahrak
        

        function setMap(id) {
            const map = maps[id];
            mapId = id;
            player.position = [...map.start];
            player.tileFrom = map.start.map(px => Math.floor(px / 40.0));
            player.tileTo = map.start.map(px => Math.floor(px / 40.0));
            console.log(map);
            console.log("bbbbbbbbbbb"+  map.gameMap.map((tile, i) => [tile, { x: i % 8, y: Math.floor(i / 8) }]).filter(tile => tile[0] == 2).forEach((tile, i) => rooms[tile[1].x + tile[1].y * 6 - 6] = i + 1));
            map.gameMap.map((tile, i) => [tile, { x: i % 8, y: Math.floor(i / 8) }]).filter(tile => tile[0] == 2).forEach((tile, i) => rooms[tile[1].x + tile[1].y * 6 - 6] = i + 1);
            return map.gameMap;
        }


        function Character() {
            this.tileFrom = [1, 1];
            this.tileTo = [1, 1];
            this.timeMoved = 0;
            this.dimensions = [30, 30];
            this.position = [45, 45];
            this.delayMove = 700;
            this.direction = directions.up;

            this.sprites = {};
            this.sprites[directions.up] = [{ x: 0, y: 120, w: 30, h: 30 }];
            this.sprites[directions.right] = [{ x: 0, y: 150, w: 30, h: 30 }];
            this.sprites[directions.down] = [{ x: 0, y: 180, w: 30, h: 30 }];
            this.sprites[directions.left] = [{ x: 0, y: 210, w: 30, h: 30 }];

            this.target = null;
            this.moving = false;
            this.plan = [];
            this.lastMove = null;
            this.lastClick = null;
            this.stack = [];
        }
        Character.prototype.placeAt = function (x, y) {
            this.tileFrom = [x, y];
            this.tileTo = [x, y];
            this.position = [((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
            ((tileH * y) + ((tileH - this.dimensions[1]) / 2))];
        };

        Character.prototype.processMovement = function (t) {
            if (this.tileFrom[0] == this.tileTo[0] &&
                this.tileFrom[1] == this.tileTo[1]) { return false; }


            if ((t - this.timeMoved) >= this.delayMove) {
                this.placeAt(this.tileTo[0], this.tileTo[1]);
            }

            else {
                this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0]) / 2);
                this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1]) / 2);

                if (this.tileTo[0] != this.tileFrom[0]) {
                    var diff = (tileW / this.delayMove) * (t - this.timeMoved);
                    this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
                }

                if (this.tileTo[1] != this.tileFrom[1]) {
                    var diff = (tileH / this.delayMove) * (t - this.timeMoved);
                    this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
                }

                this.position[0] = Math.round(this.position[0]);
                this.position[1] = Math.round(this.position[1]);
            }

            return true;
        };

        Character.prototype.canMoveTo = function (x, y) {
            if (x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
            if (tileTypes[gameMap[toIndex(x, y)]].floor != floorTypes.path) { return false; }
            return true;
        };

        Character.prototype.moveEligible = function (x, y) {
            return getTileType(x, y) == 2;
        };

        Character.prototype.resetTarget = function () {
            this.target = null;
            this.lastMove = null;
        }

        Character.prototype.canMoveUp = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1); };
        Character.prototype.canMoveDown = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1); };
        Character.prototype.canMoveLeft = function () { return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]); };
        Character.prototype.canMoveRight = function () { return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]); };

        Character.prototype.moveLeft = function (t) { this.tileTo[0] -= 1; this.timeMoved = t; this.direction = directions.left; this.lastMove = 'left'; };
        Character.prototype.moveRight = function (t) { this.tileTo[0] += 1; this.timeMoved = t; this.direction = directions.right; this.lastMove = 'right'; };
        Character.prototype.moveUp = function (t) { this.tileTo[1] -= 1; this.timeMoved = t; this.direction = directions.up; this.lastMove = 'up'; };
        Character.prototype.moveDown = function (t) { this.tileTo[1] += 1; this.timeMoved = t; this.direction = directions.down; this.lastMove = 'down'; };
        Character.prototype.execMove = function (x, y, direction) {
            switch (direction) {
                case "up":
                    return this.moveUp(Date.now());
                case "down":
                    return this.moveDown(Date.now());
                case "right":
                    return this.moveRight(Date.now());
                case "left":
                    return this.moveLeft(Date.now());
            }
        };

        Character.prototype.moveToLocation = function () {
            if (!!this.target && this.moveEligible(this.target.x, this.target.y)) {
                var playerX = Math.floor(this.position[0] / 40.0);
                var playerY = Math.floor(this.position[1] / 40.0);
                if (getTileType(playerX, playerY) == 2 && playerX == this.target.x && playerY == this.target.y) {
                    gameMap[playerX + playerY * 8] = 1;
                    this.plan.push({ Action: `Room-visited`, explain: true });
                    if (isAllVisited(gameMap)) {
                        $.post("/game", { path: this.convertPlan(), mapId: mapId }, data => {
                            sessionStorage.setItem('explainabilityUUID', data);
                            window.location.href = '/questions';
                        });
                    }
                    return this.resetTarget();
                }
                if (getTileType(playerX, playerY) == 3) {
                    gameMap[playerX + playerY * 8] = 1;
                }
                const move = this.stack.pop();
                if (move) {
                    this.execMove(playerX, playerY, move);
                }
                else {
                    this.resetTarget();
                }
            } else {
                this.resetTarget();
            }
        };

        Character.prototype.confirmLastMove = function () {
            if (this.lastMove) {
                $('.confirmationButton').attr('disabled', null);
                // const conf = confirmAction(this.lastMove.charAt(0).toUpperCase() + this.lastMove.slice(1));
                // this.plan.push({ Action: this.lastMove, explain: conf });
                // if (!conf && confirm('1. Do you want to CHANGE the robot\'s target?')) {
                //     this.resetTarget();
                // }
            }
        }

        Character.prototype.getPlanSize = function () {
            return this.plan.length;
        }

        function toIndex(x, y) {
            return ((y * mapW) + x);
        }

        function getTileType(x, y) {
            return gameMap[x + y * 8];
        }

        function confirmAction(action) {
            return confirm(`2. Do you think the robot is doing the RIGHT thing?`);
        }

        function isAllVisited() {
            return !gameMap.filter(tile => tile == 2).length;
        }

        function BFS(target, v) {
            const s = [];
            const seen = new Set();
            s.push({ index: v, move: null, parent: null });
            while (s.length) {
                v = s.pop();
                seen.add(v.index);
                if (v.index == target) {
                    return v;
                }
                adjacentEdges(v.index).forEach(e => seen.has(e.index) ? null : s.unshift({ index: e.index, move: e.move, parent: v }));
            }
        }

        function adjacentEdges(v) {
            const tiles = [];
            if (v - 1 >= 0 && tileTypes[gameMap[v - 1]].floor == floorTypes.path) tiles.push({ index: v - 1, move: 'left' });
            if (v % 8 < (v + 1) % 8 && tileTypes[gameMap[v + 1]].floor == floorTypes.path) tiles.push({ index: v + 1, move: 'right' });
            if (v - 8 >= 0 && tileTypes[gameMap[v - 8]].floor == floorTypes.path) tiles.push({ index: v - 8, move: 'up' });
            if (v + 8 < 100 && tileTypes[gameMap[v + 8]].floor == floorTypes.path) tiles.push({ index: v + 8, move: 'down' });
            return tiles;
        }

        function drawGame() {
            console.log("inside drawGame**");
            if (ctx == null) { return; }
            if (!tilesetLoaded) { requestAnimationFrame(drawGame); return; }

            var currentFrameTime = Date.now();
            var timeElapsed = currentFrameTime - lastFrameTime;

            var sec = Math.floor(Date.now() / 1000);
            if (sec != currentSecond) {
                currentSecond = sec;
                framesLastSecond = frameCount;
                frameCount = 1;
            }
            else { frameCount++; }

            player.moving = player.processMovement(currentFrameTime);
            if (!player.moving) {
                if (player.lastMove) {
                    player.confirmLastMove();
                } else if (player.target) {
                    player.moveToLocation();
                }
            }

            ctx.fillStyle = "#000000";

            for (var y = 0; y < mapH; ++y) {
                for (var x = 0; x < mapW; ++x) {
                    var tile = tileTypes[gameMap[toIndex(x, y)]];
                    ctx.drawImage(tileset,
                        tile.sprite[0].x, tile.sprite[0].y,
                        tile.sprite[0].w, tile.sprite[0].h,
                        (x * tileW),
                        (y * tileH),
                        tileW, tileH);
                }
            }

            var sprite = player.sprites[player.direction];
            ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
                player.position[0],
                player.position[1],
                player.dimensions[0], player.dimensions[1]);

            // ctx.fillStyle = "#ff0000";
            // ctx.fillText("FPS: " + framesLastSecond, 10, 20);

            lastFrameTime = currentFrameTime;
            requestAnimationFrame(drawGame);
        }

        Character.prototype.convertPlan = function () {
            let currLoc = (m => m[0] + m[1] * 6 - 6)(maps[mapId].start.map(px => Math.floor(px / 40.0)));
            let numObj = 0;
            let lastRoom = 'dummy-room';
            return this.plan.map(p => {
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
                        lastRoom = rooms[currLoc];
                        return { Action: `visit-room rover1 room${lastRoom} loc${currLoc}`, explain: p.explain };
                    default:
                        let loc = (l => parseInt(l[0]) + parseInt(l[1]) * 6 - 6)(p.Action.split(/[()]/)[1].split(','));
                        return { Action: `set-to-visit room${rooms[loc]} ${lastRoom == 'dummy-room' ? lastRoom : `room${lastRoom}`}`, explain: p.explain };
                }
            });
        }

        $('.confirmationButton').click(function () {
            player.plan.push({ Action: player.lastMove, explain: this.id == 'true', obstacle: gameMap[player.tileTo[0] + player.tileTo[1] * 8] == 3 });
            player.lastMove = null;
            if (player.lastClick) {
                player.plan.push({ Action: `Human-Clicked (${player.lastClick.x},${player.lastClick.y})`, explain: true });
                player.lastClick = null;
            }
            $('.confirmationButton').attr('disabled', 'disabled');
        });

    </script>