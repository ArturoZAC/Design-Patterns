/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import { COLORS } from "../helpers/colors.ts";

// import { COLORS } from '../helpers/colors.ts';


//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución
// import { red } from "https://deno.land/std@0.224.0/fmt/colors.ts";


class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    this.fields = fields;
    return this;
  }

  where(condition: string): QueryBuilder {
    this.conditions.push( condition );
    return this;
  }

  orderBy(field?: string, order: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    this.orderFields.push(`${field} ${order}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitCount = count;
    return this;
  }

  execute(): string {

    console.log(this.orderFields);
    

    const fields = this.fields.length > 0 ? this.fields.join(', ') : '*';

    const whereClause = 
      this.conditions.length > 0 
        ? `WHERE ${ this.conditions.join(' AND ')}`
        : ' ';

    const orderByClause = this.orderFields.length > 0
      ? `ORDER BY ${ this.orderFields.join(', ')}`
      : '';

    const limitClause = this.limitCount ? `LIMIT ${ this.limitCount };` : '';

    return `Select ${ fields } from ${ this.table } ${whereClause} ${orderByClause} ${limitClause}`;

  }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select('id', 'name', 'email')
    .where('age > 18')
    .where("country = 'Cri'") // Esto debe de hacer una condición AND
    .orderBy('name', 'ASC')
    .limit(10)
    .execute();

  console.log('%cConsulta: ', COLORS.red);
  console.log(usersQuery);
}

main();
