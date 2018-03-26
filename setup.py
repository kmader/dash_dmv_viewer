from setuptools import setup

exec (open('dwv_viewer/version.py').read())

setup(
    name='dwv_viewer',
    version=__version__,
    author='kmader',
    packages=['dwv_viewer'],
    include_package_data=True,
    license='MIT',
    description='View DICOMs in Dash',
    install_requires=[]
)
