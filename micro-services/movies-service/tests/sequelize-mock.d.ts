declare module 'sequelize-mock' {
    import { Model, Sequelize } from 'sequelize';
  
    export class SequelizeMock extends Sequelize {
      define(name: string, attributes: any, options?: any): any;
      getModel(name: string): any;
    }
  
    export class ModelMock extends Model {
      $queueResult(result: any): void;
      $queueError(error: Error): void;
      $queueClear(): void;
    }
  }
  