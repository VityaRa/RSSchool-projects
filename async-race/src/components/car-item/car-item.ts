import { DISTANCE } from '../../constants';
import { throwEvent, throwEventData } from '../../utils/throwEventData';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Car } from '../models';
import { API } from '../requests-api/requests-api';
import { state } from '../state';
import './car-item.scss';

const flagIcon = `
  <svg width="50" height="50" viewBox="0 0 84 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.66671 100H0.333374V0H8.66671V100ZM83.6667
    8.33333H17V58.3333H83.6667L67 33.4625L83.6667 8.33333V8.33333Z" fill="red"/>
  </svg>
`;

export class CarItem extends BaseComponent {
  private name = '';

  private color = '';

  public id = 0;

  private carIcon = new BaseComponent('div', ['car__icon']);

  constructor(carInfo: Car) {
    super('li', ['car__item']);
    if (carInfo.id) {
      this.id = carInfo.id;
    }

    const selectBtn = new Button(
      [],
      'select',
      'car__single__controller',
      'select',
    );
    const removeBtn = new Button(
      [],
      'remove',
      'car__single__controller',
      'remove',
    );

    const rideBtn = new Button(
      ['btn-action', 'btn-car__action'],
      'A',
      'car__single__move',
      'ride',
    );
    const stopBtn = new Button(
      ['btn-car__action'],
      'B',
      'car__single__move',
      'stop',
    );

    removeBtn.element.addEventListener('click', () => {
      (async () => {
        await API.deleteCar(this.id);
        await API.deleteWinner(this.id);
        throwEvent('Car_Removed');
      })();
    });

    selectBtn.element.addEventListener('click', () => {
      state.isCarSelected = true;
      API.getCar(this.id).then((car) => throwEventData('Update_Car', car));
    });

    rideBtn.element.addEventListener('click', () => {
      (async () => {
        await this.runCar(this.id);
      })();
    });

    stopBtn.element.addEventListener('click', () => {
      (async () => {
        await this.stopCar(this.id);
        this.backCar();
      })();
    });

    this.name = carInfo.name;
    this.color = carInfo.color;

    const title = new BaseComponent('p', ['car__name']);
    title.element.innerHTML = this.name;

    this.element.appendChild(selectBtn.element);
    this.element.appendChild(removeBtn.element);
    this.element.appendChild(title.element);

    this.element.appendChild(rideBtn.element);
    this.element.appendChild(stopBtn.element);

    this.addRaceTrack();
  }

  addRaceTrack() {
    const raceElem = new BaseComponent('div', ['race__track']);

    this.carIcon.element.innerHTML = this.getCarIcon(this.color);
    this.element.appendChild(this.carIcon.element);

    const flag = new BaseComponent('div', ['flag-container']);
    flag.element.innerHTML = flagIcon;
    this.element.appendChild(flag.element);

    raceElem.element.appendChild(this.carIcon.element);
    raceElem.element.appendChild(flag.element);

    const line = new BaseComponent('hr', ['car__item__line']);
    this.element.appendChild(raceElem.element);
    this.element.appendChild(line.element);
  }

  getCarIcon = (color: string): string => `
    <svg width="100" height="30" viewBox="0 0 197 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42.8099 31.4825C34.8826 31.5599 28.5214 38.0423 28.5968 45.9696C28.6027 46.5888 28.6544 47.1823 28.7377 47.7757C29.6944 54.8456 35.7678 60.2582 43.0838 60.1847C50.6001 60.1153 56.6974 54.2839 57.2512 46.9262C57.2809 46.5194 57.3067 46.1125 57.3028 45.7016C57.2273 37.7703 50.7391 31.4071 42.8099 31.4825ZM41.6229 36.9447L41.6607 41.073C41.2081 41.1961 40.7913 41.3747 40.3964 41.6149L37.447 38.7191C38.6398 37.7922 40.0589 37.1729 41.6229 36.9447ZM35.7083 40.4955L38.6616 43.3953C38.4413 43.7903 38.2647 44.213 38.1555 44.6596L34.0292 44.7052C34.2276 43.1353 34.8112 41.7042 35.7083 40.4955ZM34.0351 47.1863L38.1932 47.1466C38.3163 47.5892 38.491 48.004 38.7252 48.3871L35.8174 51.3464C34.9044 50.1635 34.2713 48.7404 34.0351 47.1863ZM37.6097 53.0772L40.5015 50.1297C40.8846 50.3441 41.3094 50.5108 41.752 50.622L41.7897 54.7623C40.2356 54.5618 38.8125 53.9624 37.6097 53.0772ZM51.8466 44.5346L47.7182 44.5742C47.6011 44.1237 47.4205 43.7049 47.1843 43.3139L50.0861 40.3565C51.005 41.5494 51.6164 42.9685 51.8466 44.5346ZM44.1059 36.9208C45.6759 37.1233 47.1069 37.7148 48.3137 38.6159L45.4198 41.5613C45.0269 41.3331 44.6001 41.1584 44.1436 41.0413L44.1059 36.9208ZM44.2766 54.7365L44.2369 50.5961C44.6795 50.479 45.0943 50.3084 45.4774 50.0761L48.4208 52.972C47.2379 53.885 45.8267 54.5102 44.2766 54.7365ZM50.1853 51.2174L47.2181 48.3057C47.4364 47.9186 47.6249 47.5038 47.7401 47.0513L51.8605 47.0116C51.658 48.5736 51.0864 50.0186 50.1853 51.2174Z"
      fill="${color}"/>
      <path d="M158.698 31.4825C150.77 31.5599 144.409 38.0423 144.484 45.9696C144.49 46.5888 144.542 47.1823 144.625 47.7757C145.58 54.8456 151.656 60.2582 158.971 60.1847C166.486 60.1153 172.585 54.2839 173.139 46.9262C173.171 46.5194 173.194 46.1125 173.19 45.7016C173.115 37.7703 166.627 31.4071 158.698 31.4825ZM157.507 36.9447L157.546 41.073C157.092 41.1961 156.677 41.3747 156.282 41.6149L153.333 38.7191C154.524 37.7922 155.941 37.1729 157.507 36.9447ZM151.596 40.4955L154.549 43.3953C154.327 43.7903 154.152 44.213 154.041 44.6596L149.917 44.7052C150.115 43.1353 150.699 41.7042 151.596 40.4955ZM149.923 47.1863L154.081 47.1466C154.204 47.5892 154.377 48.004 154.613 48.3871L151.705 51.3464C150.792 50.1635 150.155 48.7404 149.923 47.1863ZM153.497 53.0772L156.389 50.1297C156.77 50.3441 157.197 50.5108 157.638 50.622L157.677 54.7623C156.123 54.5618 154.696 53.9624 153.497 53.0772ZM167.734 44.5346L163.606 44.5742C163.489 44.1237 163.308 43.7049 163.072 43.3139L165.974 40.3565C166.893 41.5494 167.504 42.9685 167.734 44.5346ZM159.99 36.9208C161.558 37.1233 162.993 37.7148 164.197 38.6159L161.304 41.5613C160.913 41.3331 160.484 41.1584 160.027 41.0413L159.99 36.9208ZM160.16 54.7365L160.121 50.5961C160.563 50.479 160.978 50.3084 161.361 50.0761L164.305 52.972C163.126 53.885 161.714 54.5102 160.16 54.7365ZM166.073 51.2174L163.106 48.3057C163.324 47.9186 163.513 47.5038 163.628 47.0513L167.748 47.0116C167.546 48.5736 166.974 50.0186 166.073 51.2174Z"
      fill="${color}"/>
      <path d="M196.736 16.1062C196.504 15.8164 196.151 15.6437 195.777 15.6437H183.099C182.596 15.6437 182.146 15.9534 181.963 16.4238L181.155 18.4979C181.155 18.4979 145.382 5.45572 137.403 2.68096C131.216 0.529425 114.143 0.688211 104.106 0.995856C99.1599 1.14869 94.2119 2.16689 89.6151 4.00482C81.1659 7.38098 67.0223 13.1905 59.746 17.0728C42.4486 17.438 26.2488 21.3699 22.6583 23.1046C19.0698 24.8413 11.3172 31.7862 11.3172 31.7862L1.94111 36.7263C0.662905 37.4012 -0.0932983 38.7667 0.0118954 40.2117L0.57359 47.7857C0.698632 49.4807 1.97882 50.8562 3.65596 51.1122L25.9908 54.4804L27.8287 54.405C26.7589 52.5294 26.0186 50.4294 25.7149 48.1826C25.6077 47.4225 25.5521 46.704 25.5442 45.9994C25.4529 36.4028 33.1856 28.5192 42.784 28.4259C52.4619 28.4259 60.268 36.1607 60.3573 45.6699C60.3613 46.1681 60.3335 46.6583 60.2998 47.1505C60.139 49.2683 59.5813 51.2809 58.7199 53.1248L142.974 52.9502C142.301 51.4635 141.829 49.8638 141.603 48.1846C141.495 47.4244 141.438 46.706 141.432 46.0013C141.341 36.4048 149.073 28.5212 158.672 28.4279C168.348 28.4279 176.158 36.1627 176.245 45.6719C176.249 46.1701 176.221 46.6603 176.186 47.1525C176.102 48.27 175.91 49.3636 175.62 50.4195L176.404 50.358L191.56 45.8108C192.945 45.396 193.951 44.1991 194.126 42.7661L195.48 31.4706C195.65 30.0475 195.357 28.6125 194.642 27.37L192.1 22.9438L196.027 19.9607C196.254 19.788 196.413 19.5439 196.482 19.266L196.978 17.1542C197.05 16.781 196.964 16.398 196.736 16.1062ZM128.588 18.1882L90.1748 19.3176C90.1748 19.3176 90.1688 14.5799 84.4904 13.9904L93.547 8.62545C96.8199 6.68431 100.518 5.69588 104.322 5.72565C111.251 5.77924 122.733 5.90825 129.511 6.19803C130.714 6.24765 131.81 6.91852 132.405 7.96848C133.001 9.01845 133.012 10.3026 132.435 11.3625C130.539 14.8518 128.588 18.1882 128.588 18.1882Z"
      fill="${color}"/>
    </svg>
    `;

  startAnimation(speed: number, isRace = false): void {
    let value = 0;
    const time = DISTANCE / speed;
    const handler = () => {
      const curValue = this.carIcon.element.style.marginLeft;
      if (+curValue.split('%')[0] >= 79 && !state.winnerCount && isRace) {
        state.winnerCount = 1;
        (async () => {
          await API.createWinner({
            wins: 1,
            time: +(DISTANCE / speed / 1000).toFixed(2),
          });
          alert(`${this.name} WINS`);
        })();
      }
      value += (0.8 / time) * 1000;
      this.carIcon.element.style.marginLeft = `${value}%`;
    };
    const interval = setInterval(handler, 10);
    setTimeout(() => {
      clearInterval(interval);
      this.stopCar(this.id);
    }, DISTANCE / speed);
  }

  async runCar(carID: number, isRace = false): Promise<void> {
    const startAns = await API.toggleEngine(carID, 'started');
    const driveAns = API.turnDrive(carID);
    this.startAnimation(startAns.velocity, isRace);
  }

  async stopCar(carID: number): Promise<void> {
    this.id = carID;
    const stopCarAns = await API.toggleEngine(carID, 'stopped');
  }

  backCar(): void {
    this.carIcon.element.style.marginLeft = '0%';
  }
}
