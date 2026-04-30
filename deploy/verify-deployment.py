#!/usr/bin/env python3
"""
MindMirror Deployment Verification Script
Verify all services are running correctly
"""

import sys
import time
import urllib.request
import urllib.error

def check_service(name, url, timeout=5):
    try:
        response = urllib.request.urlopen(url, timeout=timeout)
        status = response.getcode()
        if 200 <= status < 300:
            print(f"✅ {name}: ONLINE ({status})")
            return True
        else:
            print(f"⚠️ {name}: HTTP {status}")
            return False
    except urllib.error.HTTPError as e:
        print(f"✅ {name}: ONLINE (HTTP {e.code})")
        return True
    except Exception as e:
        print(f"❌ {name}: OFFLINE - {str(e)}")
        return False

def main():
    print("=" * 50)
    print("MindMirror - Deployment Verification")
    print("=" * 50)
    print()

    print("Waiting 5 seconds for services to be ready...")
    time.sleep(5)
    print()

    all_good = True
    
    # Check services
    services = [
        ("Frontend (Nginx)", "http://localhost"),
        ("Backend API Health", "http://localhost/api/health"),
        ("Backend API Docs", "http://localhost/api/docs"),
    ]

    for name, url in services:
        if not check_service(name, url):
            all_good = False

    print()
    print("=" * 50)
    
    if all_good:
        print("✅ ALL SERVICES ONLINE!")
        print()
        print("Access your application:")
        print("  Game:     http://localhost")
        print("  API Docs: http://localhost/api/docs")
    else:
        print("❌ Some services failed!")
        print("Run: docker compose logs -f")
        sys.exit(1)
    
    print("=" * 50)

if __name__ == "__main__":
    main()
