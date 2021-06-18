# TS Mock

- **Generate interface** from json/object/class
- **Generate mock data** from interface

## Usage

### Data to Interface

- #### json to interface
  ![json to interface](src/images/json.gif)
- #### object to interface
  ![object to interface](src/images/obj.gif)
- #### class to interface
  ![class to interface](src/images/class.gif)

### Interface to Data

- #### interface to mock data

  ![interface to mock data](src/images/inter.gif)

  #### Type Support

  The following TypeScript features are supported:

  - Interfaces
  - Interfaces with properties of primitive types
  - Interfaces with property references to other complex types
  - Interfaces with extensions
  - Unions
  - Type aliases
  - Arrays
  - Namespaces
  - Tuples
  - Mapped types
  - Generics
  - Functions (stringified output!)
  - Optional properties
  - Specific [Faker](https://github.com/marak/Faker.js/#api-methods) data types (via JSDoc comment)
    ```ts
    interface Host {
      /** @mockType {internet.ipv6} */
      addr: string
    }
    ```

## Menu Options

| Command                     |
| --------------------------- |
| TS Mock - Data to Interface |
| TS Mock - Interface to Data |

# License

MIT
