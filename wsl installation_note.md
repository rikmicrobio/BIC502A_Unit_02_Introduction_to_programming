# WSL 2 Installation Guide

## Computational Biology Practical Environment

This guide will help you set up a Linux-based environment on Windows using **Windows Subsystem for Linux (WSL 2)**.

The environment will be used for computational biology and bioinformatics practical sessions.

---

## 1. Requirements

Before starting, make sure you have:

- Windows 10 or Windows 11
- Administrator access
- Internet connection
- At least 10 GB of free disk space

---

## 2. Install WSL

Open **PowerShell as Administrator**.

Search for **PowerShell** in the Windows Start Menu, right-click it, and select:

**Run as administrator**

Then run:

```powershell
wsl --install
```

Windows will install WSL 2 and Ubuntu.

Once the installation is complete, **restart your computer**.

---

## 3. Start Ubuntu

After restarting:

1. Open the Windows Start Menu.
2. Search for **Ubuntu**.
3. Open Ubuntu.

The first time Ubuntu starts, it will ask you to create a Linux username and password.

For example:

```text
Enter new UNIX username: student
New password:
Retype new password:
```

### Important

When typing your Linux password, **nothing will appear on the screen**.

This is normal behavior in Linux. Type the password and press `Enter`.

---

## 4. Update Ubuntu

Open Ubuntu and run:

```bash
sudo apt update
```

Then:

```bash
sudo apt upgrade
```

If asked:

```text
Do you want to continue? [Y/n]
```

Type:

```text
Y
```

and press `Enter`.

---

## 5. Install Basic Tools

Install the basic command-line tools required for the practical sessions:

```bash
sudo apt install git wget curl build-essential
```

Check that they were installed correctly:

```bash
git --version
wget --version
curl --version
```

If these commands return version numbers, the installation was successful.

---

## 6. Check WSL Version

Close Ubuntu and open **PowerShell**.

Run:

```powershell
wsl -l -v
```

You should see something similar to:

```text
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

The important part is:

```text
VERSION
2
```

This confirms that Ubuntu is running under **WSL 2**.

---

## 7. Create a Working Directory

Inside Ubuntu, create a directory for the practical sessions:

```bash
mkdir -p ~/bioinformatics
```

Move into the directory:

```bash
cd ~/bioinformatics
```

Check your current location:

```bash
pwd
```

You should see something similar to:

```text
/home/student/bioinformatics
```

---

## 8. Clone the Practical Repository

Once the course repository is available, clone it using:

```bash
git clone <REPOSITORY-URL>
```

For example:

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

Move into the repository:

```bash
cd REPOSITORY
```

List the files:

```bash
ls
```

---

## 9. Accessing Windows Files from Ubuntu

WSL allows you to access your Windows files from Ubuntu.

The Windows `C:` drive is available at:

```text
/mnt/c/
```

For example, your Windows Downloads folder can be accessed using:

```bash
cd /mnt/c/Users/<WINDOWS-USERNAME>/Downloads
```

You can check the files using:

```bash
ls
```

---

## 10. Basic Linux Commands

You will frequently use the following commands during the practical sessions:

| Command | Description |
|---------|-------------|
| `pwd` | Show current directory |
| `ls` | List files |
| `cd` | Change directory |
| `mkdir` | Create a directory |
| `cp` | Copy files |
| `mv` | Move or rename files |
| `rm` | Remove files |
| `cat` | Display file contents |
| `head` | Show beginning of a file |
| `tail` | Show end of a file |
| `grep` | Search text |
| `find` | Find files |
| `clear` | Clear the terminal |

---

## 11. Verify the Installation

Run the following commands inside Ubuntu:

```bash
echo "Testing bioinformatics environment..."
```

Then:

```bash
git --version
```

```bash
wget --version
```

```bash
curl --version
```

Finally:

```bash
mkdir -p ~/bioinformatics/test
cd ~/bioinformatics/test
echo "Bioinformatics practical environment is ready." > test.txt
cat test.txt
```

Expected output:

```text
Bioinformatics practical environment is ready.
```

If you see the expected output, your basic environment is ready.

---

## 12. Next Step

The next stage is to install the software required for the computational biology practicals.

The setup will follow this sequence:

```text
Windows
   |
   v
WSL 2
   |
   v
Ubuntu
   |
   v
Linux Command-Line Tools
   |
   v
Git
   |
   v
Conda
   |
   v
Bioinformatics Software
```

Complete this installation before starting the practical exercises.

---

## Troubleshooting

### WSL command is not recognized

Make sure you are using **Windows 10 or Windows 11** with the latest available updates.

Restart Windows and try:

```powershell
wsl --install
```

### Check WSL status

```powershell
wsl --status
```

### Check installed distributions

```powershell
wsl -l -v
```

### Restart WSL

If Ubuntu becomes unresponsive:

```powershell
wsl --shutdown
```

Then open Ubuntu again.

### Update WSL

```powershell
wsl --update
```

---

## Quick Installation

For experienced users, the essential steps are:

### PowerShell - Administrator

```powershell
wsl --install
```

Restart Windows.

### Ubuntu

```bash
sudo apt update
sudo apt upgrade
sudo apt install git wget curl build-essential
```

### Verify

```bash
git --version
wget --version
curl --version
```

If all three commands return version information, the basic installation is complete.

---

## Ready for the Practical

Once WSL 2, Ubuntu, Git, and the basic Linux tools are working, you are ready to proceed with the next installation step:

**Conda and the required bioinformatics software.**
