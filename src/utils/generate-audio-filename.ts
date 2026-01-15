export function generateAudioFilename(patientName: string, mimetype?: string): string {
    const firstName = patientName.split(' ')[0].toLowerCase();

    const sanitizedName = firstName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    const extension = getExtensionFromMimetype(mimetype);

    const timestamp = Date.now();

    return `${sanitizedName}-${timestamp}.${extension}`;
}

function getExtensionFromMimetype(mimetype?: string): string {
    const mimeToExt: Record<string, string> = {
        'audio/webm': 'webm',
        'audio/wav': 'wav',
        'audio/wave': 'wav',
        'audio/x-wav': 'wav',
        'audio/ogg': 'ogg',
        'audio/flac': 'flac',
        'audio/m4a': 'm4a',
        'audio/mp4': 'm4a',
        'audio/mpeg': 'mp3',
        'audio/mp3': 'mp3',
        'audio/x-m4a': 'm4a',
    };

    return mimeToExt[mimetype || ''] || 'mp3';
}