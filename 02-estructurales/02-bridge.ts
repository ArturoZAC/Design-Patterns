import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

interface Ability {
  use(): void;
}

class SwordAttact implements Ability {
  use(): void {
    console.log('Ataca con una %cespada ferozmente', COLORS.blue);
  };
};

class AxeAttact implements Ability {
  use(): void {
    console.log('Ataca con una %chacha brutalmente', COLORS.blue);
  };
};

class MagicSpell implements Ability {
  use(): void {
    console.log('Ataca con una %cespada ferozmente', COLORS.green);
  };
};

abstract class Character {
  protected ability: Ability;

  constructor( ability: Ability ){
    this.ability = ability;
  }

  setAbility( ability: Ability ): void {
    this.ability = ability;
  }

  abstract perfomAbility(): void;
}

class Warrior extends Character {
  override perfomAbility(): void {
    console.log('\nEl guerrero está listo para luchar');
    this.ability.use();
  };
}

class Mage extends Character {
  override perfomAbility(): void {
    console.log('\nEl mago prepara su magia');
    this.ability.use();
  };
}

function main(){

  const warrior = new Warrior( new SwordAttact() );
  warrior.perfomAbility();

  warrior.setAbility( new AxeAttact() );
  warrior.perfomAbility();

  const mage = new Mage( new MagicSpell() );
  mage.perfomAbility();

}

main();