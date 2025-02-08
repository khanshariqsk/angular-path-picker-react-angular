import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonViewComponent } from './components/json-view/json-view.component';
import { OnPathClickProps } from './components/json-view/JsonView';
import _ from 'lodash';

const data = [
  {
    id: 1,
    name: 'John Doe',
    contact: {
      email: 'john.doe@example.com',
      phone: {
        mobile: '123-456-7890',
        home: '555-555-5555',
      },
    },
    isValid: false,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
    },
    orders: [
      {
        orderId: 'A001',
        amount: 250.0,
        items: [
          {
            itemId: 'I001',
            name: 'Laptop',
            price: 150.0,
            attributes: {
              color: 'Silver',
              brand: 'Dell',
            },
          },
          {
            itemId: 'I002',
            name: 'Mouse',
            price: 25.0,
            attributes: {
              color: 'Black',
              brand: 'Logitech',
            },
          },
        ],
      },
      {
        orderId: 'A002',
        amount: 300.0,
        items: [
          {
            itemId: 'I003',
            name: 'Phone',
            price: 300.0,
            attributes: {
              color: 'Gold',
              brand: 'Samsung',
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    contact: {
      email: 'jane.smith@example.com',
      phone: {
        mobile: '987-654-3210',
        home: '444-444-4444',
      },
    },
    isValid: false,
    address: {
      street: '456 Elm St',
      city: 'San Francisco',
      state: 'CA',
      zipcode: '94102',
    },
    orders: [
      {
        orderId: 'B001',
        amount: 120.0,
        items: [
          {
            itemId: 'I004',
            name: 'Headphones',
            price: 120.0,
            attributes: {
              color: 'White',
              brand: 'Sony',
            },
          },
        ],
      },
    ],
  },
];

const randomNestedObject = {
  user: {
    id: Math.floor(Math.random() * 10000),
    name: 'John Doe',
    email: 'john.doe@example.com',
    profile: {
      age: Math.floor(Math.random() * 50) + 20,
      isActive: Math.random() > 0.5,
      preferences: {
        theme: ['dark', 'light', 'blue'][Math.floor(Math.random() * 3)],
        notifications: {
          email: Math.random() > 0.5,
          sms: Math.random() > 0.5,
          push: Math.random() > 0.5,
        },
      },
      createdAt: new Date().toISOString(),
    },
  },
  orders: [
    {
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      totalAmount: (Math.random() * 500).toFixed(2),
      items: [
        {
          productId: `P-${Math.floor(Math.random() * 1000)}`,
          name: ['Laptop', 'Phone', 'Tablet', 'Headphones', 'Monitor'][
            Math.floor(Math.random() * 5)
          ],
          price: (Math.random() * 1000).toFixed(2),
          metadata: {
            warranty: `${Math.floor(Math.random() * 3) + 1} years`,
            color: ['Red', 'Blue', 'Black', 'White', 'Silver'][
              Math.floor(Math.random() * 5)
            ],
            brand: ['Apple', 'Samsung', 'Dell', 'Sony', 'LG'][
              Math.floor(Math.random() * 5)
            ],
          },
        },
      ],
      orderDate: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
    },
  ],
  analytics: {
    lastLogin: new Date(
      Date.now() - Math.floor(Math.random() * 100000000)
    ).toISOString(),
    sessionDuration: Math.floor(Math.random() * 3600) + ' seconds',
    geoLocation: {
      country: ['USA', 'India', 'Germany', 'Australia', 'Canada'][
        Math.floor(Math.random() * 5)
      ],
      city: ['New York', 'Berlin', 'Sydney', 'Toronto', 'Mumbai'][
        Math.floor(Math.random() * 5)
      ],
    },
    device: {
      type: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)],
      os: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'][
        Math.floor(Math.random() * 5)
      ],
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'][
        Math.floor(Math.random() * 5)
      ],
    },
  },
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonViewComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-path-picker';
  sourceData: any = data;
  value: any = data;

  handlePathSelection(path: OnPathClickProps) {
    console.log({ path });
    console.log('parsedValue', _.get(this.value, path.keyPath));
  }

  ngOnInit() {
    setTimeout(() => {
      this.sourceData = randomNestedObject;
      this.value = randomNestedObject;
    }, 10000);
  }
}
