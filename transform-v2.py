#!/usr/bin/env python3
"""
Complete Website Transformation Script
Rebuilds Araviel website to keynote presentation quality
"""

import re

def read_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filename, content):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

def transform_html(html):
    """Transform HTML to world-class quality"""

    # Fix navigation - ensure proper IDs
    html = html.replace('id="problem"', 'id="features"')

    # Update hero subtitle - make it punchy
    old_subtitle = r'Why choose between ChatGPT, Claude, or Gemini\? Araviel gives you all of them\. We automatically route every request to the perfect AI model, so you always get the best answer\. No switching\. No guessing\. Just results\.'
    new_subtitle = 'The AI that picks the best AI. ChatGPT for coding. Claude for writing. Gemini for research. All in one place, chosen automatically.'
    html = re.sub(old_subtitle, new_subtitle, html)

    # Update stats section to be more fun
    stats_old = r'<div class="hero-stats animate-in delay-3">.*?</div>\s*</div>'
    stats_new = '''<div class="hero-stats-new animate-in delay-3">
                    <div class="stat-pill">
                        <span class="stat-emoji">🚀</span>
                        <span class="stat-text">Launching <strong>January 2026</strong></span>
                    </div>
                    <div class="stat-pill">
                        <span class="stat-emoji">⚡</span>
                        <span class="stat-text">MVP <strong>February 2026</strong></span>
                    </div>
                    <div class="stat-pill">
                        <span class="stat-emoji">🎯</span>
                        <span class="stat-text"><strong>100%</strong> Automatic</span>
                    </div>
                </div>
            </div>'''
    html = re.sub(stats_old, stats_new, html, flags=re.DOTALL)

    # Update "See How It Works" button styling - change class
    html = html.replace('class="btn btn-text"', 'class="btn btn-ghost"')

    return html

def main():
    print("🎨 Transforming Araviel website to world-class quality...")

    # Read current HTML
    html = read_file('index.html')

    # Apply transformations
    html = transform_html(html)

    # Write back
    write_file('index.html', html)

    print("✅ HTML transformed successfully!")
    print("\nNext: Run the CSS transformation...")

if __name__ == "__main__":
    main()
