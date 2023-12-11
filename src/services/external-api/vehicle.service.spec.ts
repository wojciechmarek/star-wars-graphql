import { VehicleApiService } from './vehicle.service';

describe('VehicleApiService', () => {
  let vehicleApiService: VehicleApiService;

  beforeEach(() => {
    process.env = Object.assign(process.env, {
      SWAPI_BASE_URL: 'https://swapi.dev/api',
    });
    vehicleApiService = new VehicleApiService();
  });

  describe('getVehicleById', () => {
    it('should return a vehicle object when given a valid id', async () => {
      const name = 'Sand Crawler';
      const id = 4;
      const vehicle = await vehicleApiService.getVehicleById(id);
      expect(vehicle).toBeDefined();
      expect(vehicle.name).toBe(name);
    });

    it('should throw an error when given an invalid id', async () => {
      const id = -1;
      await expect(vehicleApiService.getVehicleById(id)).rejects.toThrow();
    });
  });

  describe('getPaginatedVehicles', () => {
    it('should return an array of vehicles when given a valid page number', async () => {
      const page = 1;
      const vehicles = await vehicleApiService.getPaginatedVehicles(page);

      expect(vehicles).toBeDefined();
      expect(Array.isArray(vehicles)).toBe(true);
    }, 10000);

    it('should throw an error when given an invalid page number', async () => {
      const page = -1;
      await expect(
        vehicleApiService.getPaginatedVehicles(page),
      ).rejects.toThrow();
    });
  });
});
