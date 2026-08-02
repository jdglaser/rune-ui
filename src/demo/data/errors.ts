export class EntityNotFoundError extends Error {
  readonly entityName: string;
  readonly entityId: string;

  constructor(entityName: string, entityId: string) {
    super(`${entityName} with ID "${entityId}" was not found.`);
    this.name = "EntityNotFoundError";
    this.entityName = entityName;
    this.entityId = entityId;
  }
}
