import { ImageResponse } from 'next/og'
import { site } from './lib/site'

export const alt = `${site.name} — ${site.jobTitle} · ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const stack = ['Java', 'Spring Boot', 'AWS', 'Kafka', 'PostgreSQL']

/**
 * Social preview card. Generated at build time by next/og (satori), so there is
 * no binary asset to keep in sync. Remember: satori requires an explicit
 * `display: flex` on every element that has more than one child.
 */
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#09090b',
                    color: '#fafafa',
                    padding: '76px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        fontSize: 24,
                        letterSpacing: 4,
                        color: '#a1a1aa',
                    }}
                >
                    IXMAK.COM
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', fontSize: 84, fontWeight: 700 }}>
                        {site.name}
                    </div>
                    <div style={{ display: 'flex', fontSize: 42, color: '#d4d4d8', marginTop: 16 }}>
                        {site.jobTitle}
                    </div>
                    <div style={{ display: 'flex', fontSize: 32, color: '#71717a', marginTop: 10 }}>
                        {site.tagline}
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {stack.map((tech) => (
                        <div
                            key={tech}
                            style={{
                                display: 'flex',
                                fontSize: 26,
                                color: '#d4d4d8',
                                border: '1px solid #3f3f46',
                                borderRadius: 999,
                                padding: '10px 28px',
                                marginRight: 14,
                            }}
                        >
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        ),
        size
    )
}
