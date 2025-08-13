describe('Tests Básicos TDD', () => {
  it('should test basic functionality', () => {
    expect(true).toBe(true);
  });

  it('should test arithmetic operations', () => {
    expect(2 + 2).toBe(4);
    expect(10 - 5).toBe(5);
  });

  it('should test string operations', () => {
    expect('hello'.toUpperCase()).toBe('HELLO');
    expect('world'.length).toBe(5);
  });

  it('should test array operations', () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
    expect(arr.includes(2)).toBe(true);
  });

  it('should test object operations', () => {
    const paciente = { nombre: 'Juan', edad: 30 };
    expect(paciente.nombre).toBe('Juan');
    expect(paciente.edad).toBeGreaterThan(18);
  });
});

// ✅ JASMINE - Características avanzadas
describe('JASMINE Framework - Características Avanzadas', () => {
  let testData: any;

  // beforeEach se ejecuta antes de cada test
  beforeEach(() => {
    testData = {
      pacientes: ['Juan', 'María', 'Pedro'],
      citas: [],
      fecha: new Date('2025-08-01')
    };
  });

  // afterEach se ejecuta después de cada test
  afterEach(() => {
    testData = null;
  });

  describe('Matchers de Jasmine', () => {
    it('should test various Jasmine matchers', () => {
      // Matchers de igualdad
      expect('test').toBe('test');
      expect({ a: 1 }).toEqual({ a: 1 });

      // Matchers de truthiness
      expect(true).toBeTruthy();
      expect(false).toBeFalsy();
      expect(null).toBeNull();
      expect(undefined).toBeUndefined();

      // Matchers numéricos
      expect(5).toBeGreaterThan(3);
      expect(2).toBeLessThan(5);
      expect(3.14).toBeCloseTo(3.1, 1);

      // Matchers de arrays y strings
      expect(['a', 'b', 'c']).toContain('b');
      expect('Hello World').toMatch(/World/);
    });

    it('should test custom matchers for dental system', () => {
      const cita = {
        paciente: 'Juan Pérez',
        fecha: '2025-08-01',
        hora: '09:00',
        estado: 'Programada'
      };

      expect(cita.paciente).toMatch(/Juan/);
      expect(cita.estado).toBe('Programada');
      expect(cita.hora).toMatch(/\d{2}:\d{2}/);
    });
  });

  describe('Spies y Mocks de Jasmine', () => {
    it('should test spies', () => {
      const servicioCitas = {
        crearCita: (datos: any) => 'Cita creada',
        enviarEmail: (email: string) => 'Email enviado'
      };

      // Crear spy
      spyOn(servicioCitas, 'crearCita').and.returnValue('Mock: Cita creada');
      spyOn(servicioCitas, 'enviarEmail').and.callThrough();

      // Ejecutar métodos
      const resultado = servicioCitas.crearCita({ paciente: 'Juan' });
      servicioCitas.enviarEmail('juan@email.com');

      // Verificar spy
      expect(servicioCitas.crearCita).toHaveBeenCalled();
      expect(servicioCitas.crearCita).toHaveBeenCalledWith({ paciente: 'Juan' });
      expect(servicioCitas.enviarEmail).toHaveBeenCalledWith('juan@email.com');
      expect(resultado).toBe('Mock: Cita creada');
    });
  });

  describe('Tests Asíncronos con Jasmine', () => {
    it('should test async operations', (done) => {
      setTimeout(() => {
        expect(true).toBe(true);
        done(); // Indica que el test asíncrono terminó
      }, 100);
    });

    it('should test promises', async () => {
      const promesa = Promise.resolve('Datos cargados');
      const resultado = await promesa;
      expect(resultado).toBe('Datos cargados');
    });
  });
});

describe('Tests Avanzados TDD - Sistema Odontológico', () => {
  describe('Validaciones de Pacientes', () => {
    it('should validate patient email format', () => {
      const validEmail = 'paciente@email.com';
      const invalidEmail = 'invalid-email';
      
      expect(validEmail.includes('@')).toBe(true);
      expect(invalidEmail.includes('@')).toBe(false);
    });

    it('should validate patient phone format', () => {
      const validPhone = '0999999999';
      const invalidPhone = '123';
      
      expect(validPhone.length).toBe(10);
      expect(invalidPhone.length).toBeLessThan(10);
    });
  });

  describe('Citas Management', () => {
    it('should validate appointment time slots', () => {
      const availableHours = ['08:00', '09:00', '10:00'];
      const bookedHour = '09:00';
      
      expect(availableHours.includes(bookedHour)).toBe(true);
      expect(availableHours.length).toBeGreaterThan(0);
    });

    it('should validate appointment dates', () => {
      const today = new Date();
      const futureDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      
      expect(futureDate > today).toBe(true);
    });
  });
});

// Agrega esto a tu tests.spec.ts para ver información del navegador
describe('CHROME HEADLESS - Browser Information', () => {
  it('should display browser information', () => {
    console.log('User Agent:', navigator.userAgent);
    console.log('Platform:', navigator.platform);
    console.log('Language:', navigator.language);
    
    expect(navigator.userAgent).toContain('Chrome');
    expect(navigator.userAgent).toContain('HeadlessChrome');
  });

  it('should test DOM operations in browser', () => {
    // Crear elemento DOM
    const div = document.createElement('div');
    div.innerHTML = 'Test DOM Element';
    document.body.appendChild(div);

    expect(div.innerHTML).toBe('Test DOM Element');
    expect(document.querySelector('div')).toBeTruthy();

    // Limpiar
    document.body.removeChild(div);
  });
});
