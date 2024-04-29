

class Celula {
    constructor(x, y, w) {
        // Constructor: Inicializa as propriedades da célula
        this.x = x; // Coordenada x da célula
        this.y = y; // Coordenada y da célula
        this.w = w; // Largura da célula

        this.flag = null; // Flag que indica se a célula tem uma bandeira
        this.covered = true; // Flag que indica se a célula está coberta

        this.neighborsList = []; // Lista de vizinhos da célula
        this.neighborsCount = 0; // Contador de vizinhos da célula (inicializado como 0)
    }

    selectionArea(x, y) {
        // Método para selecionar uma área
        var _el = this; 
        
    }
}


			return (
				y >= _el.y * _el.w && y <= _el.y * _el.w + _el.w && x >= _el.x * _el.w && x <= _el.x * _el.w + _el.w
			);
		}

		draw (Sprites, tileSize) {
			let _el         = this,
			    coordinates = [_el.x * tileSize, _el.y * tileSize, tileSize, tileSize];

			if (_el.covered) {
				let flag = _el.flag	? Sprites[_el.flag]	: Sprites.covered;

				return flag.toDraw(...coordinates);
			}

			switch (_el.neighborsCount) {
				case -1:
					if (_el.detonated) {
						return Sprites.detonated.toDraw(...coordinates);
					}

					Sprites.hasBomb.toDraw(...coordinates);
					break;
				case 0:
					if (_el.flag === 'bombFlag') {
						return Sprites.noBomb.toDraw(...coordinates);
					}

					Sprites.emptyCell.toDraw(...coordinates);
					break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
					if (_el.flag === 'bombFlag') {
						return Sprites.noBomb.toDraw(...coordinates);
					}

					Sprites.numbers['number' + _el.neighborsCount].toDraw(...coordinates);
					break;
			}
		}

		revealIt (matriz) {
			this.covered = false;

			if (this.neighborsCount === 0) {
				this.floodFill(matriz);
			}
		}

		floodFill (matriz) {
			var _el = this;

			for (var i = -1; i <= 1; i++) {
				if (!matriz[_el.y + i]) continue;
				for (var j = -1; j <= 1; j++) {
					var celula = matriz[_el.y + i][_el.x + j];
					if (!celula || !i && !j) continue;
					if (celula.neighborsCount >= 0 && celula.covered) {
						celula.revealIt(matriz);
					}
				}
			}
		}
	}


