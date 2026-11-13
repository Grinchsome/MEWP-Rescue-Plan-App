MEWP READY — PHONE REVIEW APP 0.18.2

This is an installable web app (PWA), not an APK or an App Store download.
It contains the 11 existing machine drafts and their pictures. No technical
approval is implied. The HSEQ review checklist has not been added.

UPLOAD TO GITHUB PAGES — NO BUILD OR CODING REQUIRED

1. Extract MEWP-Ready-Installable-App.zip on your computer.
2. In GitHub, create a new repository, for example mewp-ready-review.
   A public repository works with GitHub Free. If using a company account,
   follow its sharing policy; Pages availability for private repositories
   depends on the account plan. A private repository does not, by itself,
   make the Pages website private. This package has no sign-in restriction.
3. Choose Add file > Upload files. Upload the CONTENTS of the extracted
   folder, including index.html, pwa.js, sw.js, manifest.webmanifest and the
   icons folder. Do not upload the ZIP itself or an extra enclosing folder.
   README.txt and .nojekyll may also be uploaded. There are no dependencies.
4. Commit the files to the main branch.
5. Go to repository Settings > Pages. Under Build and deployment, select
   Deploy from a branch, then main and / (root), and Save.
6. Wait for GitHub Pages to finish. Use the website URL displayed in Pages
   settings, typically https://YOUR-NAME.github.io/mewp-ready-review/.
   Ensure HTTPS is enabled. Share this WEBSITE link, not the repository link.

INSTALL ON YOUR PHONE

Open the website URL in the phone's normal browser, not an email/social-app
preview. Keep it open until 'Offline copy ready' appears.

iPhone/iPad: Safari > Share > Add to Home Screen. Enable Open as Web App
if that option appears, then Add.
Android: Chrome > three-dot menu > Install app or Add to Home screen > Install.
You can also try the app's Install on phone button.

Open the new MEWP Ready icon. For your own review, try search, a saved machine,
the Refresher tab and image enlargement. Then turn on airplane mode, close
and reopen the installed app, and check that entries and diagrams still load.
Restore your connection afterwards. Phone installation itself must be checked
on your device; a desktop preview cannot establish that it works on every phone.

OFFLINE AND SAVED INFORMATION

The complete app, machine instructions, cover photos and diagrams are cached.
Full manufacturer PDFs and external source links still require the internet.
The browser can evict cached files if storage is low, or if you clear site data;
check the offline indicator and try reopening in airplane mode after installation.

Favourites and site-briefing notes remain in that phone/browser. They do not
sync to a manager's phone or GitHub. Clearing browser data may erase them.
Data from the original file-based prototype does not transfer automatically.
Do not use the local notes as the sole record of an approved rescue plan.

UPDATES

Upload a complete new release to the same repository when it is ready.
Every release must change RELEASE in sw.js; the release builder uses a content
hash. Uploading only index.html without changing sw.js will leave existing
installed users on their previous cached version.
Open the installed app online and use App information > Check for updates.
When available, choose Load update. The app asks before reloading; saved data
is retained, but you return to the library. Review the visible version number.

SHARING AND REVIEW STATUS

GitHub Pages is normally publicly accessible. This app has no authentication,
central approval record, automatic content expiry, or remote revocation of
offline copies. It is packaged for you and your manager to review, not as a
release approved for operational rescue use. Ensure permission to redistribute
the supplied and manufacturer reference photos before wider publication.
Photo source details are in the machine covers; the SJ3220 uses a clearly
labelled shared SJ3220/26 range image showing SJ3226.

Official setup references:
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
https://web.dev/learn/pwa/installation
