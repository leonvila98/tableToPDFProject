export interface Video {
    id: number;
    codigo: number;
    nota: number;
    descripcion: string;
    fecha: Date | string;
    duracion: string;
    observacion: string;
    norma?: number;
    normadescripcion: string;
    clase?: number;
    clasedescripcion: string;
    personaje1: string;
    personaje2: string;
    personaje3: string;
    personaje4: string;
    estado: string;
    sector?: string;
    inicial?: string;
    empty?: string;
}
