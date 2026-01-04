export abstract class BaseUseCase {
  
  /**
   * Executa um bloco de lógica assíncrona (geralmente uma chamada de repositório)
   * e aplica o tratamento de erro padrão (log + re-throw).
   * * Usamos `this.constructor.name` para registrar automaticamente o nome
   * da subclasse (ex: 'LoginUseCase') no log de erro.
   *
   * @param logicBlock A função assíncrona (lambda) a ser executada.
   * @returns A Promessa resolvida pelo logicBlock.
   */
  protected async _tryExecute<T>(
    logicBlock: () => Promise<T>
  ): Promise<T> {
    try {
      return await logicBlock();
    } catch (error) {
      console.error(`Erro no ${this.constructor.name}:`, error);
      throw error; 
    }
  }
}