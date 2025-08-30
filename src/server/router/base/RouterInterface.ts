/**
 * interface defining the contract for router implementations
 * ensures all router classes implement the required route setup method
 */
export interface IRouter {
    routes(): void
}