import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { randomUUID } from 'crypto';

// Schema definition inline to avoid import issues
const insertRegistrationSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  countryCode: z.string().optional(),
  email: z.string().email("Email inválido"),
  beltColor: z.enum(["branca", "azul", "roxa", "marrom", "preta"], {
    required_error: "Selecione a cor da faixa"
  })
});

type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
type Registration = InsertRegistration & {
  id: string;
  createdAt: Date;
  countryCode: string;
};

// Simple in-memory storage for serverless (will reset on each cold start)
const registrations = new Map<string, Registration>();

class MemStorage {
  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const registration: Registration = {
      ...insertRegistration,
      id,
      countryCode: insertRegistration.countryCode || "+55",
      createdAt: new Date(),
    };
    registrations.set(id, registration);
    return registration;
  }

  async getRegistrations(): Promise<Registration[]> {
    return Array.from(registrations.values());
  }
}

const storage = new MemStorage();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      console.log('Received POST request with body:', req.body);
      const validatedData = insertRegistrationSchema.parse(req.body);
      const registration = await storage.createRegistration(validatedData);
      console.log('Created registration:', registration);
      res.status(200).json({ success: true, registration });
    } else if (req.method === 'GET') {
      const allRegistrations = await storage.getRegistrations();
      console.log('Retrieved registrations:', allRegistrations.length);
      res.status(200).json(allRegistrations);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        message: "Dados inválidos",
        errors: error.errors 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
