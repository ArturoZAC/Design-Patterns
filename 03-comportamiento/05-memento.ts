import { COLORS } from "../helpers/colors.ts";

/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */
class GameMemento {
  private level: number;
  private healt: number;
  private position: string;

  constructor(level: number, healt: number, position: string){
    this.level = level;
    this.healt = healt;
    this.position = position;
  }

  getLevel(){
    return this.level;
  }

  getHealt(){
    return this.healt;
  }

  getPosition(){
    return this.position;
  }
}

class Game {
  private level: number;
  private healt: number;
  private position: string;

  constructor(level: number, healt: number, position: string){
    this.level = level;
    this.healt = healt;
    this.position = position;
    console.log(`Juando en el nivel ${ this.level }
                  Salud: ${ this.healt }
                  posicion ${ this.position }
                  `);
  }

  save(): GameMemento {
    return new GameMemento(this.level,this.healt,this.position);
  }

  play(level: number, healt: number, position: string):void {
    this.level = level;
    this.healt = healt;
    this.position = position;

    console.log(`Jugando en el nivel ${ this.level } salud: ${ this.healt } posicion: ${ this.position }`);
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.healt = memento.getHealt();
    this.position = memento.getPosition();

    console.log(`Progreso restaurado 
      %cRestauración en el nivel ${this.level}
        salud: ${this.healt}
        posicíon: ${this.position}  
      `, COLORS.yellow, COLORS.blue, COLORS.white);
    
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento){
    return this.mementos.push(memento);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

