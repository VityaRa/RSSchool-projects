import { BasicURL } from '../../constants';
import { Car, EngineMode, Winner } from '../models';

export class API {
  private static basicURL = BasicURL;

  private static garageURL = 'garage/';

  private static winnerURL = 'winners/';

  private static engineURL = 'engine?';

  static async getCars(
    _page?: number | string,
    _limit?: number | string,
  ): Promise<Car[]> {
    const page = _page ? `?_page=${_page}` : '';
    const limit = _limit ? `&_limit=${_limit}` : '';
    try {
      const req = await fetch(this.basicURL + this.garageURL + page + limit);
      const data = await req.json();
      return data;
    } catch {
      alert('error');
      return [];
    }
  }

  static async getCarsCount(): Promise<string | null> {
    const req = await fetch(
      `${this.basicURL + this.garageURL}?_page=1&_limit=1`,
    );
    return req.headers.get('X-Total-Count');
  }

  static async getCar(id: number): Promise<Car> {
    const req = await fetch(this.basicURL + this.garageURL + id);
    const data = await req.json();
    return data;
  }

  static async createCar(carInfo: Car) {
    try {
      const req = await fetch(this.basicURL + this.garageURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carInfo),
      });
      const data = await req.json();
      return data;
    } catch {
      alert('error');
      return null;
    }
  }

  static async deleteCar(id: number) {
    try {
      const req = await fetch(this.basicURL + this.garageURL + id, {
        method: 'DELETE',
      });
      const data = await req.json();
      return data;
    } catch {
      alert('error');
      return null;
    }
  }

  static async updateCar(id: number, carInfo: Car) {
    try {
      const req = await fetch(this.basicURL + this.garageURL + id, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carInfo),
      });
      const data = await req.json();
      return data;
    } catch {
      alert('error');
      return null;
    }
  }

  static async getWinners(_page?: number | string, _limit?: number | string) {
    const page = _page ? `?_page=${_page}` : '';
    const limit = _limit ? `&_limit=${_limit}` : '';
    try {
      const req = await fetch(this.basicURL + this.winnerURL + page + limit);
      const data = await req.json();
      return data;
    } catch {
      alert('error');
      return null;
    }
  }

  static async getWinner(id: number) {
    try {
      const req = await fetch(this.basicURL + this.winnerURL + id);
      const data = await req.json();
      return data;
    } catch {
      alert('error');
      return null;
    }
  }

  static async getWinnersCount() {
    const req = await fetch(
      `${this.basicURL + this.winnerURL}?_page=1&_limit=1`,
    );
    return req.headers.get('X-Total-Count');
  }

  static async createWinner(winnerInfo: Winner) {
    try {
      const req = await fetch(this.basicURL + this.winnerURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winnerInfo),
      });
      const data = await req.json();
      return data;
    } catch {
      alert('error');
      return null;
    }
  }

  static async deleteWinner(id: number) {
    try {
      const req = await fetch(this.basicURL + this.winnerURL + id, {
        method: 'DELETE',
      });
      const data = await req.json();
      return data;
    } catch {
      alert('error');
      return null;
    }
  }

  static async updateWinner(id: number, winnerInfo: Winner) {
    try {
      const req = await fetch(this.basicURL + this.winnerURL + id, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winnerInfo),
      });
      const data = await req.json();
      return data;
    } catch {
      alert('error');
      return null;
    }
  }

  static async toggleEngine(id: number, status: EngineMode) {
    const query = `id=${id}&status=${status}`;
    try {
      const req = await fetch(this.basicURL + this.engineURL + query);
      const data = await req.json();
      return data;
    } catch {
      console.log('drive turn error');
      return null;
    }
  }

  static async turnDrive(id: number) {
    const query = `id=${id}&status=drive`;

    try {
      const req = await fetch(this.basicURL + this.engineURL + query);
      const data = await req.json();
      return data;
    } catch (e) {
      console.log('err');
      return null;
    }
  }
}
